import { ImageResponse } from "next/og"
import { client, isSanityConfigured } from "@/lib/sanity/client"
import { postBySlugQuery } from "@/lib/sanity/queries"

export const runtime = "edge"

export const alt = "Blog Post - Midwife Dumebi"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

// Minimal type for OG image generation (no "use cache" here)
type OGPost = {
  title: string;
  excerpt: string;
  category?: { title: string };
  featuredImage?: { url: string };
}

async function getPostForOG(slug: string): Promise<OGPost | null> {
  if (!isSanityConfigured) return null;

  try {
    const post = await client.fetch(postBySlugQuery, { slug });
    if (!post) return null;

    return {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      featuredImage: post.featuredImage,
    };
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostForOG(slug)

  // Fallback if post not found
  const title = post?.title || "Blog Post"
  const category = post?.category?.title || "Midwifery"
  const excerpt = post?.excerpt || ""
  const image = post?.featuredImage?.url

  // Truncate title if too long
  const displayTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title
  // Truncate excerpt if too long
  const displayExcerpt =
    excerpt.length > 120 ? `${excerpt.substring(0, 117)}...` : excerpt

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fbf6ef 0%, #f3e9dd 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #e9b7b0 0%, #c98f88 50%, #8faf9a 100%)",
          }}
        />

        {/* Left side - Featured image area */}
        <div
          style={{
            width: "400px",
            height: "100%",
            background: "linear-gradient(135deg, #e9b7b0 0%, #c98f88 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <img
              src={image}
              alt=""
              width={380}
              height={380}
              style={{
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          ) : (
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "72px",
                  color: "#fffdfc",
                  fontWeight: "700",
                }}
              >
                MD
              </span>
            </div>
          )}
        </div>

        {/* Right side - Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          {/* Category badge */}
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "#8faf9a",
                color: "#fffdfc",
                borderRadius: "16px",
                padding: "8px 16px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {category}
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#2a1e1a",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {displayTitle}
          </h1>

          {/* Excerpt */}
          {displayExcerpt && (
            <p
              style={{
                fontSize: "24px",
                color: "#6b5b53",
                lineHeight: 1.5,
                marginBottom: "32px",
              }}
            >
              {displayExcerpt}
            </p>
          )}

          {/* Author/Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e9b7b0 0%, #c98f88 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "#fffdfc",
                  fontWeight: "700",
                }}
              >
                MD
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#2a1e1a",
                }}
              >
                Midwife Dumebi
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "#6b5b53",
                }}
              >
                www.midwifedumebi.com
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
