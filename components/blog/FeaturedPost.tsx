"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faArrowRight } from "@fortawesome/pro-solid-svg-icons"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog/types"

type FeaturedPostProps = {
  post: BlogPost
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-8 bg-surface rounded-3xl border border-border overflow-hidden shadow-sm">
        {/* Image */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
          <img
            src={post.image || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(post.title)}`}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/30 to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <span className="inline-block self-start px-3 py-1 bg-blush/20 text-rose rounded-full text-xs font-medium mb-4">
            Featured
          </span>

          <span className="text-sm text-sage font-medium mb-2">{post.categoryLabel}</span>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-primary leading-tight mb-4">
            {post.title}
          </h2>

          <p className="text-text-secondary leading-relaxed mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} size="sm" />
              {post.readingTime}
            </span>
          </div>

          <Button asChild className="self-start bg-rose hover:bg-terracotta text-white rounded-full px-6">
            <Link href={`/blog/${post.slug}`}>
              Read article
              <FontAwesomeIcon icon={faArrowRight} size="sm" className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default FeaturedPost
