import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import {
  postsQuery,
  featuredPostsQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  categoriesQuery,
  searchPostsQuery,
  relatedPostsQuery,
} from "@/lib/sanity/queries";
import type {
  BlogPost,
  BlogCategory,
  SanityPost,
  SanityCategory,
} from "./types";

/**
 * Convert Sanity post to legacy BlogPost format for backward compatibility
 */
function sanityPostToBlogPost(post: SanityPost): BlogPost {
  return {
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    category: (post.category?.slug?.current || "resources") as BlogCategory,
    categoryLabel: post.category?.title || "Resources",
    author: post.author?.name || "Midwife Dumebi",
    authorTitle: post.author?.title,
    authorBio: post.author?.bio,
    authorImage: post.author?.image,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime ? `${post.readingTime} min read` : "5 min read",
    featured: post.featured || false,
    image: post.featuredImage?.url,
    imageAlt: post.featuredImage?.alt,
    imageCredit: post.featuredImage?.credit,
    imageCreditUrl: post.featuredImage?.creditUrl,
    seo: post.seo,
  };
}

/**
 * Get all blog posts (cached)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("blog-list");
  cacheTag("blog-posts");

  if (!isSanityConfigured) {
    console.warn("Sanity not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID to enable blog.");
    return [];
  }
  try {
    const posts: SanityPost[] = await client.fetch(postsQuery);
    return posts.map(sanityPostToBlogPost);
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug (cached)
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  "use cache";
  cacheLife("blog-post");
  cacheTag("blog-posts", `blog-post-${slug}`);

  if (!isSanityConfigured) {
    return undefined;
  }
  try {
    const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });
    if (!post) return undefined;
    return sanityPostToBlogPost(post);
  } catch (error) {
    console.error("Error fetching post from Sanity:", error);
    return undefined;
  }
}

/**
 * Get featured posts (cached)
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("blog-list");
  cacheTag("blog-posts", "featured-posts");

  if (!isSanityConfigured) {
    return [];
  }
  try {
    const posts: SanityPost[] = await client.fetch(featuredPostsQuery);
    return posts.map(sanityPostToBlogPost);
  } catch (error) {
    console.error("Error fetching featured posts from Sanity:", error);
    return [];
  }
}

/**
 * Get posts by category (cached)
 */
export async function getPostsByCategory(
  categorySlug: BlogCategory
): Promise<BlogPost[]> {
  "use cache";
  cacheLife("blog-list");
  cacheTag("blog-posts", `blog-category-${categorySlug}`);

  if (!isSanityConfigured) {
    return [];
  }
  try {
    const posts: SanityPost[] = await client.fetch(postsByCategoryQuery, {
      categorySlug,
    });
    return posts.map(sanityPostToBlogPost);
  } catch (error) {
    console.error("Error fetching posts by category from Sanity:", error);
    return [];
  }
}

/**
 * Search posts (not cached - dynamic search queries)
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  if (!isSanityConfigured || !query || query.trim().length < 2) {
    return [];
  }

  try {
    const searchTerm = `*${query}*`;
    const posts: SanityPost[] = await client.fetch(searchPostsQuery, {
      searchTerm,
    });
    return posts.map(sanityPostToBlogPost);
  } catch (error) {
    console.error("Error searching posts in Sanity:", error);
    return [];
  }
}

/**
 * Get related posts (same category, excluding current post)
 */
export async function getRelatedPosts(
  categoryId: string,
  currentPostId: string
): Promise<BlogPost[]> {
  if (!isSanityConfigured) {
    return [];
  }
  try {
    const posts: SanityPost[] = await client.fetch(relatedPostsQuery, {
      categoryId,
      postId: currentPostId,
    });
    return posts.map(sanityPostToBlogPost);
  } catch (error) {
    console.error("Error fetching related posts from Sanity:", error);
    return [];
  }
}

/**
 * Get all categories (cached)
 */
export async function getCategories(): Promise<SanityCategory[]> {
  "use cache";
  cacheLife("blog-categories");
  cacheTag("blog-categories");

  if (!isSanityConfigured) {
    return [];
  }
  try {
    return await client.fetch(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categories from Sanity:", error);
    return [];
  }
}

/**
 * Get all post slugs for static generation (not cached - runs at build time)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return [];
  }
  try {
    const posts: SanityPost[] = await client.fetch(postsQuery);
    return posts.map((post) => post.slug.current);
  } catch (error) {
    console.error("Error fetching post slugs from Sanity:", error);
    return [];
  }
}
