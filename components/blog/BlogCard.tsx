"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import type { BlogPost } from "@/lib/blog"

type BlogCardProps = {
  post: BlogPost
  index: number
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="h-full bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-blush/50 transition-all">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.image || `/placeholder.svg?height=200&width=320&query=${encodeURIComponent(post.title)}`}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <span className="text-xs font-medium text-sage">{post.categoryLabel}</span>

            <h3 className="font-serif text-lg font-semibold text-text-primary mt-2 mb-2 group-hover:text-rose transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-text-secondary line-clamp-2 mb-4">{post.excerpt}</p>

            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} size="xs" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogCard
