import { z } from "zod";

// Schema for blog metadata generation
export const blogMetaSchema = z.object({
  title: z.string().describe("Blog post title, 50-60 characters"),
  slug: z.string().describe("URL-friendly slug, lowercase with hyphens"),
  excerpt: z.string().describe("Short excerpt, 150-200 characters"),
  metaTitle: z.string().describe("SEO meta title, 50-60 characters"),
  metaDescription: z
    .string()
    .describe("SEO meta description, 150-160 characters"),
  keywords: z.array(z.string()).describe("5-7 relevant keywords"),
});

export type BlogMeta = z.infer<typeof blogMetaSchema>;

// Schema for image search terms
export const imageSearchSchema = z.object({
  searchTerms: z.array(z.string()).describe("5 Pexels search terms"),
  altText: z.string().describe("Descriptive alt text for the ideal image"),
});

export type ImageSearch = z.infer<typeof imageSearchSchema>;

// Schema for image evaluation (AI Judge)
export const imageEvaluationSchema = z.object({
  isRelevant: z
    .boolean()
    .describe("Whether the image is relevant to the blog post"),
  confidence: z.number().min(0).max(100).describe("Confidence score 0-100"),
  reasoning: z.string().describe("Brief explanation of the evaluation"),
  concerns: z
    .array(z.string())
    .describe(
      "Any concerns about the image (e.g., too generic, wrong context, misleading)"
    ),
});

export type ImageEvaluation = z.infer<typeof imageEvaluationSchema>;

// Schema for full blog generation result
export const blogGenerationResultSchema = z.object({
  meta: blogMetaSchema,
  content: z.string().describe("Full markdown blog post content"),
  imageSearch: imageSearchSchema,
});

export type BlogGenerationResult = z.infer<typeof blogGenerationResultSchema>;
