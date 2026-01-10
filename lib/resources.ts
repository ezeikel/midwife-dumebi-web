export type ResourceType = "free-guide" | "paid-product"

export type Resource = {
  id: string
  slug: string
  title: string
  description: string
  type: ResourceType
  r2Key: string // Path in R2 bucket (e.g., "guides/free/birth-preferences.pdf")
  fileName: string // Download filename (e.g., "Birth-Preferences-Guide.pdf")
  // For paid products only
  price?: number // In pence (e.g., 99 = £0.99)
  priceDisplay?: string // "£0.99"
  stripePriceId?: string // Stripe Price ID
  // For free guides - upsell configuration
  upsellProductId?: string // ID of product to upsell in email
}

export const resources: Resource[] = [
  // Free Guides
  {
    id: "birth-preferences",
    slug: "birth-preferences",
    title: "Birth Preferences Starter Guide",
    description:
      "A simple framework to help you think about and communicate your birth preferences.",
    type: "free-guide",
    r2Key: "guides/free/birth-preferences-guide.pdf",
    fileName: "Birth-Preferences-Starter-Guide.pdf",
    upsellProductId: "birth-plan-assist",
  },
  {
    id: "questions-to-ask",
    slug: "questions-to-ask",
    title: "10 Questions to Ask Your Midwife",
    description:
      "Essential questions to help you get the most from your antenatal appointments.",
    type: "free-guide",
    r2Key: "guides/free/questions-to-ask-midwife.pdf",
    fileName: "10-Questions-To-Ask-Your-Midwife.pdf",
    upsellProductId: "birth-plan-assist",
  },
  {
    id: "maternity-notes-glossary",
    slug: "maternity-notes-glossary",
    title: "Maternity Notes Glossary",
    description:
      "A quick reference guide to common terms and abbreviations in your notes.",
    type: "free-guide",
    r2Key: "guides/free/maternity-notes-glossary.pdf",
    fileName: "Maternity-Notes-Glossary.pdf",
    upsellProductId: "birth-plan-assist",
  },
  // Paid Products
  {
    id: "birth-plan-assist",
    slug: "birth-plan-assist",
    title: "Birth Plan Assist",
    description:
      "A comprehensive digital guide to help you create a thoughtful, personalised birth plan. Includes templates, prompts, and expert guidance.",
    type: "paid-product",
    r2Key: "guides/paid/birth-plan-assist.pdf",
    fileName: "Birth-Plan-Assist.pdf",
    price: 99,
    priceDisplay: "£0.99",
    stripePriceId: "price_1IlNPIA5obl98iViOBypvOWy",
  },
]

export const getResourceById = (id: string): Resource | undefined => {
  return resources.find((resource) => resource.id === id)
}

export const getResourceBySlug = (slug: string): Resource | undefined => {
  return resources.find((resource) => resource.slug === slug)
}

export const getFreeGuides = (): Resource[] => {
  return resources.filter((resource) => resource.type === "free-guide")
}

export const getPaidProducts = (): Resource[] => {
  return resources.filter((resource) => resource.type === "paid-product")
}
