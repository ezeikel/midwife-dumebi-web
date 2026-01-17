import { PortableTextBlock } from "@portabletext/react";

// Types
export type BlogCategory =
  | "birth-planning"
  | "nhs-support"
  | "emotional-wellbeing"
  | "postnatal"
  | "resources"
  | "pain-relief"
  | "labour-and-birth"
  | "breastfeeding-and-feeding"
  | "baby-care";

export type SanityAuthor = {
  _id: string;
  name: string;
  slug: { current: string };
  title?: string;
  bio?: string;
  image?: string;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
};

export type SanityImage = {
  url: string;
  alt: string;
  credit?: string;
  creditUrl?: string;
};

export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

export type SanityGenerationMeta = {
  topic?: string;
  generatedAt?: string;
  model?: string;
  pexelsPhotoId?: string;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  author: SanityAuthor;
  category: SanityCategory;
  featuredImage?: SanityImage;
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  status?: string;
  seo?: SanitySeo;
  generationMeta?: SanityGenerationMeta;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Blog content as Portable Text blocks. Use toPlainText(body) from @portabletext/react for plain text. */
  body?: PortableTextBlock[];
  category: BlogCategory;
  categoryLabel: string;
  author: string;
  authorTitle?: string;
  authorBio?: string;
  authorImage?: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  seo?: SanitySeo;
};

// Category configuration - static data safe to import in client components
export const categories: { value: BlogCategory; label: string; color?: string }[] = [
  { value: "birth-planning", label: "Birth Planning", color: "#E8B4B8" },
  { value: "nhs-support", label: "NHS Support", color: "#A8C5B5" },
  { value: "emotional-wellbeing", label: "Emotional Wellbeing", color: "#C5A8B8" },
  { value: "postnatal", label: "Postnatal Care", color: "#C5B8A8" },
  { value: "resources", label: "Resources", color: "#C5C5A8" },
  { value: "pain-relief", label: "Pain Relief", color: "#D4A574" },
  { value: "labour-and-birth", label: "Labour & Birth", color: "#B8A8C5" },
  { value: "breastfeeding-and-feeding", label: "Breastfeeding & Feeding", color: "#A8C5C5" },
  { value: "baby-care", label: "Baby Care", color: "#C5C5A8" },
];

// Legacy exports for backward compatibility
export const blogPosts: BlogPost[] = [];
