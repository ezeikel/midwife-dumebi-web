"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { client, writeClient, uploadImageToSanity } from "@/lib/sanity/client";
import {
  coveredTopicsQuery,
  defaultAuthorQuery,
  categoryBySlugQuery,
} from "@/lib/sanity/queries";
import {
  BLOG_TOPICS,
  getRandomUncoveredTopic,
  getCoverageStats,
  type BlogTopic,
} from "@/lib/blog-topics";
import {
  BLOG_META_SYSTEM,
  BLOG_CONTENT_SYSTEM,
  IMAGE_SEARCH_SYSTEM,
  getBlogMetaPrompt,
  getBlogContentPrompt,
  getImageSearchPrompt,
} from "@/lib/ai/prompts";
import { fetchBlogPhoto } from "@/lib/pexels/client";
import { generateSearchTermsForTopic } from "@/lib/pexels/search-terms";

// Schemas for AI responses
const blogMetaSchema = z.object({
  title: z.string().max(100),
  slug: z.string(),
  excerpt: z.string().max(200),
  metaTitle: z.string().max(70),
  metaDescription: z.string().max(200),
  keywords: z.array(z.string()).min(3).max(10),
});

const imageSearchSchema = z.object({
  searchTerms: z.array(z.string()).min(1).max(5),
  altText: z.string(),
});

/**
 * Generate blog post metadata using AI
 */
async function generateBlogMeta(topic: BlogTopic) {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: blogMetaSchema,
    system: BLOG_META_SYSTEM,
    prompt: getBlogMetaPrompt(topic.topic, topic.keywords),
  });

  return result.object;
}

/**
 * Generate blog post content using AI
 */
async function generateBlogContent(
  topic: BlogTopic,
  title: string,
  coveredTopics: string[]
) {
  const result = await generateText({
    model: openai("gpt-4o"),
    system: BLOG_CONTENT_SYSTEM,
    prompt: getBlogContentPrompt(topic.topic, title, topic.keywords, coveredTopics),
    maxOutputTokens: 4000,
  });

  return result.text;
}

/**
 * Generate image search terms using AI
 */
async function generateImageSearchTerms(
  topic: string,
  title: string,
  category: string
) {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: imageSearchSchema,
    system: IMAGE_SEARCH_SYSTEM,
    prompt: getImageSearchPrompt(topic, title, category),
  });

  return result.object;
}

/**
 * Convert markdown to Sanity Portable Text blocks
 */
function markdownToPortableText(markdown: string) {
  const lines = markdown.split("\n");
  const blocks: Array<{
    _type: string;
    _key: string;
    style?: string;
    listItem?: string;
    level?: number;
    children?: Array<{
      _type: string;
      _key: string;
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _key: string;
      _type: string;
      href?: string;
      blank?: boolean;
    }>;
  }> = [];

  let keyCounter = 0;
  const generateKey = () => `block_${keyCounter++}`;

  let currentListType: "bullet" | "number" | null = null;
  let listLevel = 1;

  for (const line of lines) {
    // Skip empty lines
    if (line.trim() === "") {
      currentListType = null;
      continue;
    }

    // Headers
    const h4Match = line.match(/^####\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);
    const h1Match = line.match(/^#\s+(.+)$/);

    if (h4Match) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h4",
        children: parseInlineFormatting(h4Match[1], generateKey),
        markDefs: [],
      });
      currentListType = null;
      continue;
    }

    if (h3Match) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h3",
        children: parseInlineFormatting(h3Match[1], generateKey),
        markDefs: [],
      });
      currentListType = null;
      continue;
    }

    if (h2Match) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h2",
        children: parseInlineFormatting(h2Match[1], generateKey),
        markDefs: [],
      });
      currentListType = null;
      continue;
    }

    if (h1Match) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h1",
        children: parseInlineFormatting(h1Match[1], generateKey),
        markDefs: [],
      });
      currentListType = null;
      continue;
    }

    // Bullet lists
    const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      listLevel = Math.floor(indent / 2) + 1;
      currentListType = "bullet";

      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        listItem: "bullet",
        level: listLevel,
        children: parseInlineFormatting(bulletMatch[2], generateKey),
        markDefs: [],
      });
      continue;
    }

    // Numbered lists
    const numberMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (numberMatch) {
      const indent = numberMatch[1].length;
      listLevel = Math.floor(indent / 2) + 1;
      currentListType = "number";

      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        listItem: "number",
        level: listLevel,
        children: parseInlineFormatting(numberMatch[2], generateKey),
        markDefs: [],
      });
      continue;
    }

    // Blockquotes
    const quoteMatch = line.match(/^>\s*(.+)$/);
    if (quoteMatch) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "blockquote",
        children: parseInlineFormatting(quoteMatch[1], generateKey),
        markDefs: [],
      });
      currentListType = null;
      continue;
    }

    // Regular paragraphs
    currentListType = null;
    blocks.push({
      _type: "block",
      _key: generateKey(),
      style: "normal",
      children: parseInlineFormatting(line, generateKey),
      markDefs: [],
    });
  }

  return blocks;
}

/**
 * Parse inline formatting (bold, italic, links)
 */
function parseInlineFormatting(
  text: string,
  generateKey: () => string
): Array<{ _type: string; _key: string; text: string; marks?: string[] }> {
  const children: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }> = [];

  // Simple approach: just extract text with basic formatting
  // For a production system, you'd want a proper parser

  // Handle bold
  let processed = text;
  const boldRegex = /\*\*(.+?)\*\*/g;
  const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)|_([^_]+)_/g;

  // For now, simple text extraction (can be enhanced later)
  children.push({
    _type: "span",
    _key: generateKey(),
    text: processed.replace(/\*\*/g, "").replace(/\*/g, "").replace(/_/g, ""),
    marks: [],
  });

  return children;
}

/**
 * Calculate estimated reading time from content
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Create a new blog post in Sanity
 */
async function createSanityPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  body: ReturnType<typeof markdownToPortableText>;
  authorId: string;
  categoryId: string;
  featuredImage: {
    asset: { _type: "reference"; _ref: string };
    alt: string;
    credit?: string;
    creditUrl?: string;
  } | null;
  readingTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  generationMeta: {
    topic: string;
    generatedAt: string;
    model: string;
    pexelsPhotoId?: string;
  };
}) {
  const post = {
    _type: "post",
    title: data.title,
    slug: {
      _type: "slug",
      current: data.slug,
    },
    excerpt: data.excerpt,
    body: data.body,
    author: {
      _type: "reference",
      _ref: data.authorId,
    },
    category: {
      _type: "reference",
      _ref: data.categoryId,
    },
    featuredImage: data.featuredImage
      ? {
          _type: "image",
          asset: data.featuredImage.asset,
          alt: data.featuredImage.alt,
          credit: data.featuredImage.credit,
          creditUrl: data.featuredImage.creditUrl,
        }
      : undefined,
    publishedAt: new Date().toISOString(),
    readingTime: data.readingTime,
    status: "published",
    featured: false,
    seo: data.seo,
    generationMeta: data.generationMeta,
  };

  const result = await writeClient.create(post);
  return result;
}

/**
 * Main function to generate a random blog post
 */
export async function generateRandomBlogPost(): Promise<{
  success: boolean;
  postId?: string;
  slug?: string;
  message: string;
  error?: string;
}> {
  try {
    // 1. Get covered topics
    const coveredTopics: string[] = await client.fetch(coveredTopicsQuery);

    // 2. Get a random uncovered topic
    const topic = getRandomUncoveredTopic(coveredTopics);

    if (!topic) {
      const stats = getCoverageStats(coveredTopics);
      return {
        success: true,
        message: `All ${stats.total} topics have been covered! Consider adding new topics.`,
      };
    }

    // 3. Get default author (Dumebi)
    const author = await client.fetch(defaultAuthorQuery);
    if (!author) {
      return {
        success: false,
        message: "Default author not found. Please create an author with slug 'dumebi'.",
        error: "AUTHOR_NOT_FOUND",
      };
    }

    // 4. Get category
    const category = await client.fetch(categoryBySlugQuery, {
      slug: topic.category,
    });
    if (!category) {
      return {
        success: false,
        message: `Category '${topic.category}' not found. Please create it in Sanity.`,
        error: "CATEGORY_NOT_FOUND",
      };
    }

    // 5. Generate blog metadata
    console.log(`Generating metadata for: ${topic.topic}`);
    const meta = await generateBlogMeta(topic);

    // 6. Generate blog content
    console.log(`Generating content for: ${meta.title}`);
    const content = await generateBlogContent(topic, meta.title, coveredTopics);

    // 7. Generate image search terms and fetch image
    console.log("Fetching featured image from Pexels...");
    let featuredImage = null;
    let pexelsPhotoId: string | undefined;

    try {
      // First try AI-generated search terms
      const imageSearch = await generateImageSearchTerms(
        topic.topic,
        meta.title,
        topic.category
      );

      const { photo, searchTerm } = await fetchBlogPhoto(imageSearch.searchTerms);

      if (photo) {
        console.log(`Found image with search term: ${searchTerm}`);

        // Upload to Sanity
        const imageAsset = await uploadImageToSanity(
          photo.src.large2x,
          `${meta.slug}-featured.jpg`
        );

        featuredImage = {
          asset: imageAsset,
          alt: imageSearch.altText,
          credit: photo.photographer,
          creditUrl: photo.photographer_url,
        };
        pexelsPhotoId = String(photo.id);
      } else {
        // Try fallback with category-based search terms
        const fallbackTerms = generateSearchTermsForTopic(topic.topic, topic.category);
        const fallbackResult = await fetchBlogPhoto(fallbackTerms.slice(0, 5));

        if (fallbackResult.photo) {
          const imageAsset = await uploadImageToSanity(
            fallbackResult.photo.src.large2x,
            `${meta.slug}-featured.jpg`
          );

          featuredImage = {
            asset: imageAsset,
            alt: `Featured image for ${meta.title}`,
            credit: fallbackResult.photo.photographer,
            creditUrl: fallbackResult.photo.photographer_url,
          };
          pexelsPhotoId = String(fallbackResult.photo.id);
        }
      }
    } catch (imageError) {
      console.error("Failed to fetch/upload image:", imageError);
      // Continue without image - can be added manually in Sanity
    }

    // 8. Convert markdown to Portable Text
    const body = markdownToPortableText(content);

    // 9. Calculate reading time
    const readingTime = calculateReadingTime(content);

    // 10. Create post in Sanity
    console.log("Creating post in Sanity...");
    const post = await createSanityPost({
      title: meta.title,
      slug: meta.slug,
      excerpt: meta.excerpt,
      body,
      authorId: author._id,
      categoryId: category._id,
      featuredImage,
      readingTime,
      seo: {
        metaTitle: meta.metaTitle,
        metaDescription: meta.metaDescription,
        keywords: meta.keywords,
      },
      generationMeta: {
        topic: topic.topic,
        generatedAt: new Date().toISOString(),
        model: "gpt-4o",
        pexelsPhotoId,
      },
    });

    const stats = getCoverageStats([...coveredTopics, topic.topic]);

    return {
      success: true,
      postId: post._id,
      slug: meta.slug,
      message: `Successfully generated "${meta.title}". Coverage: ${stats.covered}/${stats.total} topics (${stats.percentCovered}%)`,
    };
  } catch (error) {
    console.error("Failed to generate blog post:", error);
    return {
      success: false,
      message: "Failed to generate blog post",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get blog generation stats
 */
export async function getBlogGenerationStats(): Promise<{
  total: number;
  covered: number;
  remaining: number;
  percentCovered: number;
  topicsByCategory: Record<string, { total: number; covered: number }>;
}> {
  const coveredTopics: string[] = await client.fetch(coveredTopicsQuery);
  const stats = getCoverageStats(coveredTopics);

  // Calculate per-category stats
  const coveredSet = new Set(coveredTopics.map((t) => t.toLowerCase()));
  const topicsByCategory: Record<string, { total: number; covered: number }> = {};

  for (const topic of BLOG_TOPICS) {
    if (!topicsByCategory[topic.category]) {
      topicsByCategory[topic.category] = { total: 0, covered: 0 };
    }
    topicsByCategory[topic.category].total++;
    if (coveredSet.has(topic.topic.toLowerCase())) {
      topicsByCategory[topic.category].covered++;
    }
  }

  return {
    ...stats,
    topicsByCategory,
  };
}
