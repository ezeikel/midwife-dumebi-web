import type { BlogCategory } from "../blog-topics";

/**
 * Search term mappings for Pexels based on blog categories
 * These are safe, professional terms that return appropriate medical/family imagery
 */
export const CATEGORY_SEARCH_TERMS: Record<BlogCategory, string[]> = {
  "birth-planning": [
    "pregnant woman planning",
    "expecting mother",
    "pregnancy preparation",
    "maternity",
    "pregnant couple",
  ],
  "nhs-support": [
    "medical appointment",
    "healthcare consultation",
    "doctor patient",
    "hospital care",
    "medical professional",
  ],
  "pain-relief": [
    "relaxation pregnancy",
    "calm mother",
    "meditation pregnant",
    "peaceful pregnancy",
    "comfort relaxation",
  ],
  "labour-and-birth": [
    "newborn baby",
    "mother baby hospital",
    "new parents",
    "childbirth",
    "maternity ward",
  ],
  "postnatal-care": [
    "mother newborn",
    "new mother baby",
    "postpartum care",
    "mother child bonding",
    "baby care",
  ],
  "breastfeeding-and-feeding": [
    "mother feeding baby",
    "breastfeeding",
    "baby bottle feeding",
    "infant feeding",
    "mother child nurturing",
  ],
  "baby-care": [
    "newborn baby care",
    "baby sleeping",
    "infant care",
    "parent with baby",
    "newborn",
  ],
  "emotional-wellbeing": [
    "mother self-care",
    "peaceful mother",
    "family support",
    "mental health wellbeing",
    "mother relaxing",
  ],
};

/**
 * Fallback search terms that work for any category
 * Used when category-specific searches don't return results
 */
export const FALLBACK_SEARCH_TERMS = [
  "pregnant woman",
  "mother and baby",
  "newborn baby",
  "family care",
  "maternity",
  "baby feet",
  "mother holding baby",
];

/**
 * Generate search terms for a specific topic
 * Extracts key concepts from the topic title and combines with category terms
 */
export function generateSearchTermsForTopic(
  topic: string,
  category: BlogCategory
): string[] {
  const categoryTerms = CATEGORY_SEARCH_TERMS[category] || [];

  // Extract potential search terms from topic
  const topicLower = topic.toLowerCase();
  const topicTerms: string[] = [];

  // Add specific topic-related terms based on keywords
  if (topicLower.includes("birth plan")) {
    topicTerms.push("birth planning", "pregnancy preparation");
  }
  if (topicLower.includes("hospital") || topicLower.includes("nhs")) {
    topicTerms.push("hospital maternity", "healthcare");
  }
  if (topicLower.includes("home birth")) {
    topicTerms.push("home birth", "natural birth");
  }
  if (topicLower.includes("caesarean") || topicLower.includes("c-section")) {
    topicTerms.push("caesarean birth", "surgical birth");
  }
  if (topicLower.includes("epidural") || topicLower.includes("pain")) {
    topicTerms.push("labour pain relief", "comfortable birth");
  }
  if (topicLower.includes("breastfeeding") || topicLower.includes("feeding")) {
    topicTerms.push("breastfeeding mother", "feeding baby");
  }
  if (topicLower.includes("postnatal") || topicLower.includes("after birth")) {
    topicTerms.push("new mother baby", "postpartum");
  }
  if (topicLower.includes("newborn") || topicLower.includes("baby")) {
    topicTerms.push("newborn baby", "infant care");
  }
  if (topicLower.includes("mental health") || topicLower.includes("depression")) {
    topicTerms.push("mother wellbeing", "peaceful mother");
  }
  if (topicLower.includes("scan") || topicLower.includes("appointment")) {
    topicTerms.push("pregnancy scan", "medical appointment");
  }
  if (topicLower.includes("induction") || topicLower.includes("labour")) {
    topicTerms.push("labour birth", "giving birth");
  }
  if (topicLower.includes("midwife")) {
    topicTerms.push("midwife care", "maternity professional");
  }
  if (topicLower.includes("partner") || topicLower.includes("support")) {
    topicTerms.push("couple pregnancy", "birth partner");
  }
  if (topicLower.includes("sleep") || topicLower.includes("rest")) {
    topicTerms.push("baby sleeping", "mother resting");
  }
  if (topicLower.includes("vitamin") || topicLower.includes("heel prick")) {
    topicTerms.push("newborn examination", "baby check-up");
  }
  if (topicLower.includes("water birth") || topicLower.includes("pool")) {
    topicTerms.push("water birth", "birthing pool");
  }

  // Combine topic-specific terms with category terms, then fallbacks
  const allTerms = [...topicTerms, ...categoryTerms, ...FALLBACK_SEARCH_TERMS];

  // Remove duplicates and return
  return [...new Set(allTerms)];
}

/**
 * Get a default placeholder image URL if Pexels search fails
 * This should be an image you host in Sanity or elsewhere
 */
export const DEFAULT_PLACEHOLDER_IMAGE = {
  url: null, // Will be set after first image is uploaded to Sanity
  alt: "Midwife Dumebi - Maternity Support",
  credit: "Midwife Dumebi",
  creditUrl: "https://www.midwifedumebi.co.uk",
};
