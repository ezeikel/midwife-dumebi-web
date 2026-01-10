import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getAllPostSlugs } from "@/lib/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedServices from "@/components/seo/RelatedServices";
import { generateArticleSchema } from "@/lib/seo/json-ld";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const slugs = await getAllPostSlugs();
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
      authors: [post.author],
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

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
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

export default BlogPostPage;
