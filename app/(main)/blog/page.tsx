import type { Metadata } from "next";
import BlogContent from "@/components/blog/BlogContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com";

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

const BlogPage = async () => {
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

export default BlogPage;
