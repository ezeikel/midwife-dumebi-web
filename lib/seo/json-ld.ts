import type { Service } from "@/lib/services"
import type { BlogPost } from "@/lib/blog/types"
import { toPlainText } from "@portabletext/react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

// Website and Organization schemas for root layout
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Midwife Dumebi",
    description: "NHS-experienced midwife offering personalized birth planning support across the UK",
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: "en-GB",
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Midwife Dumebi",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/logo.png`,
    sameAs: [
      "https://www.instagram.com/midwifedumebi",
      "https://www.facebook.com/midwifedumebi",
      "https://www.tiktok.com/@midwifedumebi",
      "https://www.linkedin.com/in/midwifedumebi",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hi@midwifedumebi.com",
      availableLanguage: "English",
    },
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "Midwife Dumebi",
    description: "Personalized birth planning and midwifery support services for expectant and new parents across the UK",
    url: baseUrl,
    image: `${baseUrl}/logo.png`,
    telephone: "",
    email: "hi@midwifedumebi.com",
    priceRange: "£0.99 - £320",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: [
      "Birth Planning Consultation",
      "NHS Maternity Guidance",
      "Midwifery Support",
      "Postnatal Support",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Midwifery Support Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plan Your Birth With Confidence",
            description: "90-minute comprehensive birth planning session",
          },
          price: "150.00",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Support With NHS Decisions",
            description: "60-minute NHS navigation and decision support session",
          },
          price: "120.00",
          priceCurrency: "GBP",
        },
      ],
    },
  }
}

// Service schema for individual service pages
export function generateServiceSchema(service: Service) {
  const priceValue = service.price >= 100 ? (service.price / 100).toFixed(2) : (service.price / 100).toFixed(2)

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: "Midwife Dumebi",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: service.type === "digital" ? "Digital Product" : "Midwifery Consultation",
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/services/${service.slug}`,
      price: priceValue,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    ...(service.type !== "digital" && {
      duration: `PT${service.durationMinutes}M`,
    }),
  }
}

// Article schema for blog posts
export function generateArticleSchema(post: BlogPost) {
  // Calculate word count from Portable Text body
  const plainText = post.body ? toPlainText(post.body) : ""
  const wordCount = plainText.trim() ? plainText.trim().split(/\s+/).length : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${baseUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.image || `${baseUrl}/og-default.png`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "Midwife Dumebi",
      jobTitle: post.authorTitle || "Registered Midwife",
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    articleSection: post.categoryLabel || "Midwifery",
    ...(wordCount && { wordCount }),
    inLanguage: "en-GB",
  }
}

// FAQ schema for FAQ page
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/faq#faqpage`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb schema
export function generateBreadcrumbSchema(
  items: { name: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  }
}

// Helper to create JSON-LD script content
export function jsonLdScriptContent(schema: object | object[]): string {
  return JSON.stringify(schema)
}
