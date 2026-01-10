"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faClock, faShareNodes, faLink, faEnvelope } from "@fortawesome/pro-solid-svg-icons"
import { faTwitter, faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { blogPosts, type BlogPost } from "@/lib/blog"
import CTAStrip from "@/components/CTAStrip"
import BlogCard from "@/components/blog/BlogCard"

type BlogPostContentProps = {
  post: BlogPost
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <>
      {/* Article header */}
      <section className="py-12 md:py-16 bg-section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-rose transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                Back to blog
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-sm font-medium text-sage">{post.categoryLabel}</span>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight mt-3 mb-6 text-balance">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <span className="font-medium text-text-primary">{post.author}</span>
                <span>•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} size="sm" />
                  {post.readingTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none 
                prose-headings:font-serif prose-headings:text-text-primary prose-headings:font-semibold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-text-secondary prose-p:leading-relaxed
                prose-strong:text-text-primary prose-strong:font-semibold
                prose-ul:text-text-secondary prose-li:marker:text-sage
                prose-a:text-rose prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />

            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="flex items-center gap-2 text-text-secondary">
                  <FontAwesomeIcon icon={faShareNodes} size="sm" />
                  Share this article
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-section-alt flex items-center justify-center text-text-secondary hover:bg-blush hover:text-white transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="sm" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-section-alt flex items-center justify-center text-text-secondary hover:bg-blush hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} size="sm" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-section-alt flex items-center justify-center text-text-secondary hover:bg-blush hover:text-white transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} size="sm" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                    className="w-10 h-10 rounded-full bg-section-alt flex items-center justify-center text-text-secondary hover:bg-blush hover:text-white transition-colors"
                    aria-label="Share via email"
                  >
                    <FontAwesomeIcon icon={faEnvelope} size="sm" />
                  </a>
                  <button
                    onClick={copyLink}
                    className="w-10 h-10 rounded-full bg-section-alt flex items-center justify-center text-text-secondary hover:bg-blush hover:text-white transition-colors"
                    aria-label="Copy link"
                  >
                    <FontAwesomeIcon icon={faLink} size="sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Author box */}
            <div className="mt-8 bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blush/20 flex items-center justify-center text-rose font-serif font-semibold text-xl">
                  MD
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-text-primary">{post.author}</h3>
                  <p className="text-sm text-text-secondary">
                    NMC registered midwife and nurse with over 10 years NHS experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-section-alt">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-primary text-center mb-10">
              Related articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTAStrip />
    </>
  )
}

// Simple markdown-like formatting
const formatContent = (content: string): string => {
  return content
    .replace(/## (.*)/g, "<h2>$1</h2>")
    .replace(/### (.*)/g, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/- (.*)/g, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.*)$/gm, (match) => {
      if (
        match.startsWith("<h") ||
        match.startsWith("<ul") ||
        match.startsWith("<li") ||
        match.startsWith("</") ||
        match.trim() === ""
      ) {
        return match
      }
      return `<p>${match}</p>`
    })
}

export default BlogPostContent
