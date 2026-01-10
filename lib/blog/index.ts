// Re-export types and static data (safe for client components)
export {
  type BlogCategory,
  type BlogPost,
  type SanityAuthor,
  type SanityCategory,
  type SanityImage,
  type SanitySeo,
  type SanityGenerationMeta,
  type SanityPost,
  categories,
  blogPosts,
} from "./types";

// Re-export server-only data fetching functions
// Note: These will throw an error if imported in client components
export {
  getAllPosts,
  getBlogPost,
  getFeaturedPosts,
  getPostsByCategory,
  searchPosts,
  getRelatedPosts,
  getCategories,
  getAllPostSlugs,
} from "./data";
