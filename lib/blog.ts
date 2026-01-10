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
import { PortableTextBlock } from "@portabletext/react";

// Types
export type BlogCategory =
  | "birth-planning"
  | "nhs-support"
  | "emotional-wellbeing"
  | "postnatal"
  | "resources"
  | "pain-relief"
  | "labour-and-birth"
  | "breastfeeding-and-feeding"
  | "baby-care";

export type SanityAuthor = {
  _id: string;
  name: string;
  slug: { current: string };
  title?: string;
  bio?: string;
  image?: string;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
};

export type SanityImage = {
  url: string;
  alt: string;
  credit?: string;
  creditUrl?: string;
};

export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

export type SanityGenerationMeta = {
  topic?: string;
  generatedAt?: string;
  model?: string;
  pexelsPhotoId?: string;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  author: SanityAuthor;
  category: SanityCategory;
  featuredImage?: SanityImage;
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  status?: string;
  seo?: SanitySeo;
  generationMeta?: SanityGenerationMeta;
};

// Legacy type for backward compatibility with existing components
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  categoryLabel: string;
  author: string;
  authorTitle?: string;
  authorBio?: string;
  authorImage?: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  body?: PortableTextBlock[];
  seo?: SanitySeo;
};

// Category configuration
export const categories: { value: BlogCategory; label: string; color?: string }[] = [
  { value: "birth-planning", label: "Birth Planning", color: "#E8B4B8" },
  { value: "nhs-support", label: "NHS Support", color: "#A8C5B5" },
  { value: "emotional-wellbeing", label: "Emotional Wellbeing", color: "#C5A8B8" },
  { value: "postnatal", label: "Postnatal Care", color: "#C5B8A8" },
  { value: "resources", label: "Resources", color: "#C5C5A8" },
  { value: "pain-relief", label: "Pain Relief", color: "#D4A574" },
  { value: "labour-and-birth", label: "Labour & Birth", color: "#B8A8C5" },
  { value: "breastfeeding-and-feeding", label: "Breastfeeding & Feeding", color: "#A8C5C5" },
  { value: "baby-care", label: "Baby Care", color: "#C5C5A8" },
];

/**
 * Convert Sanity post to legacy BlogPost format for backward compatibility
 */
function sanityPostToBlogPost(post: SanityPost): BlogPost {
  return {
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt,
    content: "", // Content is now in body as Portable Text
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
    body: post.body,
    seo: post.seo,
  };
}

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
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
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
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
 * Get featured posts
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
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
 * Get posts by category
 */
export async function getPostsByCategory(
  categorySlug: BlogCategory
): Promise<BlogPost[]> {
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
 * Search posts
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
 * Get all categories
 */
export async function getCategories(): Promise<SanityCategory[]> {
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
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching post slugs from Sanity:", error);
    return [];
  }
}

// Legacy exports for backward compatibility (these were previously used as arrays)
// Now they're empty and the async functions above should be used instead
export const blogPosts: BlogPost[] = [];
