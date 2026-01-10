"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { categories, type BlogCategory, type BlogPost } from "@/lib/blog/types";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedPost from "@/components/blog/FeaturedPost";

type BlogContentProps = {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
};

const BlogContent = ({ posts, featuredPosts }: BlogContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.categoryLabel.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, activeCategory, searchQuery]);

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary">
              Blog
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Articles, guides, and resources to support you on your pregnancy
              journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <FeaturedPost post={featuredPosts[0]} />
          </div>
        </section>
      )}

      {/* Filters and posts */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Search and category filters */}
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              {/* Search */}
              <div className="relative max-w-sm">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  size="sm"
                />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-surface border-border"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === "all"
                      ? "bg-rose text-white"
                      : "bg-section-alt text-text-secondary hover:bg-blush/20 hover:text-rose"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.value
                        ? "bg-rose text-white"
                        : "bg-section-alt text-text-secondary hover:bg-blush/20 hover:text-rose"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts grid */}
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-secondary">
                  {posts.length === 0
                    ? "No articles yet. Check back soon!"
                    : "No articles found matching your search."}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogContent;
