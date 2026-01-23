import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { PortableTextBlock } from "@portabletext/react";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries";
import type { BlogPost, BlogCategory, SanitySeo } from "@/lib/blog/types";
import BlogPostContent from "@/components/blog/BlogPostContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedServices from "@/components/seo/RelatedServices";
import { generateArticleSchema } from "@/lib/seo/json-ld";
import Loading from "@/components/Loading";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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
 * Get a single blog post by slug (cached)
 */
async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
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
 * Get all post slugs for static generation
 */
async function getAllPostSlugs(): Promise<string[]> {
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

export const generateStaticParams = async () => {
  const slugs = await getAllPostSlugs();
  // Return placeholder if no posts exist to satisfy Cache Components validation
  if (slugs.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return slugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | Midwife Dumebi Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${baseUrl}/blog/${slug}`,
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
};

/**
 * Inner component that fetches data and renders blog content.
 * Must be inside Suspense boundary to defer data fetching during prerender.
 */
const BlogPostInner = async ({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) => {
  const { slug } = await paramsPromise;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Generate Article schema
  const articleSchema = generateArticleSchema(post);

  return (
    <>
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumbs */}
      <div className="bg-section-alt pt-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="max-w-3xl mx-auto"
          />
        </div>
      </div>
      <BlogPostContent post={post} />
      <RelatedServices
        category={post.category}
        title="Need more support?"
        subtitle="These services are related to what you've been reading"
      />
    </>
  );
};

/**
 * Blog post page with Suspense boundary to defer data fetching.
 * This avoids crypto.randomUUID() errors during Next.js 16 prerendering.
 */
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <BlogPostInner paramsPromise={params} />
    </Suspense>
  );
};

export default BlogPostPage;
