import { groq } from "next-sanity";

// Get all published posts
export const postsQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    featured,
    "author": author->{
      _id,
      name,
      slug,
      title,
      bio,
      "image": image.asset->url
    },
    "category": category->{
      _id,
      title,
      slug,
      color
    },
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt,
      "credit": featuredImage.credit,
      "creditUrl": featuredImage.creditUrl
    }
  }
`;

// Get featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    "author": author->{
      _id,
      name,
      slug,
      title,
      "image": image.asset->url
    },
    "category": category->{
      _id,
      title,
      slug,
      color
    },
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt,
      "credit": featuredImage.credit,
      "creditUrl": featuredImage.creditUrl
    }
  }
`;

// Get single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    readingTime,
    featured,
    status,
    "author": author->{
      _id,
      name,
      slug,
      title,
      bio,
      "image": image.asset->url
    },
    "category": category->{
      _id,
      title,
      slug,
      description,
      color
    },
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt,
      "credit": featuredImage.credit,
      "creditUrl": featuredImage.creditUrl
    },
    seo,
    generationMeta
  }
`;

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && status == "published" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    "author": author->{
      _id,
      name,
      slug,
      title,
      "image": image.asset->url
    },
    "category": category->{
      _id,
      title,
      slug,
      color
    },
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt
    }
  }
`;

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`;

// Get all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && status == "published"].slug.current
`;

// Get covered topics (for deduplication)
export const coveredTopicsQuery = groq`
  *[_type == "post" && defined(generationMeta.topic)].generationMeta.topic
`;

// Check if a specific topic exists
export const topicExistsQuery = groq`
  count(*[_type == "post" && generationMeta.topic == $topic]) > 0
`;

// Get default author (Dumebi)
export const defaultAuthorQuery = groq`
  *[_type == "author" && slug.current == "dumebi"][0] {
    _id,
    name,
    slug,
    title,
    bio,
    "image": image.asset->url
  }
`;

// Get category by slug
export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color
  }
`;

// Get related posts (same category, excluding current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && status == "published" && category._ref == $categoryId && _id != $postId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    "author": author->{
      name,
      "image": image.asset->url
    },
    "category": category->{
      title,
      slug,
      color
    },
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt
    }
  }
`;

// Search posts
export const searchPostsQuery = groq`
  *[_type == "post" && status == "published" && (
    title match $searchTerm ||
    excerpt match $searchTerm ||
    pt::text(body) match $searchTerm
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    "author": author->{
      name,
      "image": image.asset->url
    },
    "category": category->{
      title,
      slug,
      color
    },
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt
    }
  }
`;
