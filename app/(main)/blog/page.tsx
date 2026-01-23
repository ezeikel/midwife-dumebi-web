import type { Metadata } from "next";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { PortableTextBlock } from "@portabletext/react";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { postsQuery, featuredPostsQuery } from "@/lib/sanity/queries";
import type { BlogPost, BlogCategory, SanitySeo } from "@/lib/blog/types";
import BlogContent from "@/components/blog/BlogContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Loading from "@/components/Loading";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com";

// Sanity post type for internal use
type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  author: {
    _id: string;
    name: string;
    slug: { current: string };
    title?: string;
    bio?: string;
    image?: string;
  };
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    color?: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
    credit?: string;
    creditUrl?: string;
  };
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  status?: string;
  seo?: SanitySeo;
};

/**
 * Convert Sanity post to BlogPost format
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
async function getAllPosts(): Promise<BlogPost[]> {
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
 * Get featured posts (cached)
 */
async function getFeaturedPosts(): Promise<BlogPost[]> {
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

export const metadata: Metadata = {
  title: "Blog | Birth Planning & Pregnancy Support Articles",
  description:
    "Expert articles on birth planning, NHS maternity care, pregnancy support, and postnatal guidance from an NHS-experienced midwife. Free resources for UK parents.",
  keywords: [
    "birth planning blog",
    "pregnancy advice UK",
    "midwife blog",
    "NHS maternity articles",
    "birth preparation tips",
    "postnatal support blog",
  ],
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Blog | Midwife Dumebi",
    description: "Expert articles on birth planning, pregnancy support, and NHS maternity care.",
    url: `${baseUrl}/blog`,
  },
};

/**
 * Inner component that fetches data and renders blog list.
 * Must be inside Suspense boundary to defer data fetching during prerender.
 */
const BlogListInner = async () => {
  const [posts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
  ]);

  return (
    <>
      <div className="bg-section-alt pt-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Blog" }]} className="max-w-2xl mx-auto" />
        </div>
      </div>
      <BlogContent posts={posts} featuredPosts={featuredPosts} />
    </>
  );
};

/**
 * Blog list page with Suspense boundary to defer data fetching.
 * This avoids crypto.randomUUID() errors during Next.js 16 prerendering.
 */
const BlogPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <BlogListInner />
    </Suspense>
  );
};

export default BlogPage;
