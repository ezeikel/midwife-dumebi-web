import type { Metadata } from "next"
import BlogContent from "@/components/blog/BlogContent"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and resources about birth planning, NHS maternity support, emotional wellbeing, and more from Midwife Dumebi.",
}

const BlogPage = () => {
  return <BlogContent />
}

export default BlogPage
