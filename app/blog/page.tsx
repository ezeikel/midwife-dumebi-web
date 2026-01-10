import type { Metadata } from "next";
import BlogContent from "@/components/blog/BlogContent";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and resources about birth planning, NHS maternity support, emotional wellbeing, and more from Midwife Dumebi.",
};

// Revalidate every hour to pick up new posts
export const revalidate = 3600;

const BlogPage = async () => {
  const [posts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
  ]);

  return <BlogContent posts={posts} featuredPosts={featuredPosts} />;
};

export default BlogPage;
