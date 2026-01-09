import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBlogPost, blogPosts } from "@/lib/blog"
import BlogPostContent from "@/components/blog/BlogPostContent"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () => {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = async ({ params }: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}

export default BlogPostPage
