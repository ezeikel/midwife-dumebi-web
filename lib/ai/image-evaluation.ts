/**
 * AI-powered image evaluation for blog posts
 *
 * Uses Gemini 3 Pro vision model to evaluate whether stock photos
 * are relevant and appropriate for blog post content about
 * maternity, pregnancy, and newborn care.
 */

import { generateObject } from "ai";
import { models } from "./models";
import { imageEvaluationSchema, type ImageEvaluation } from "./schemas";

export interface EvaluateImageOptions {
  /** Blog post title */
  title: string;
  /** Blog post excerpt/summary */
  excerpt: string;
  /** Blog post category */
  category: string;
  /** URL of the image to evaluate */
  imageUrl: string;
  /** Search term that found this image */
  searchTerm: string;
  /** Minimum confidence threshold (default: 60) */
  minConfidence?: number;
}

/**
 * Evaluate whether a stock photo is suitable for a blog post
 *
 * Uses Gemini 3 Pro vision model to analyze the image and determine
 * if it's relevant to the blog post content.
 *
 * @returns Evaluation result with relevance decision, confidence, and reasoning
 */
export async function evaluateImageRelevance(
  options: EvaluateImageOptions
): Promise<ImageEvaluation> {
  const { title, excerpt, category, imageUrl, searchTerm } = options;

  const prompt = `You are an expert image evaluator for a UK midwifery and maternity care blog (Midwife Dumebi).

BLOG POST CONTEXT:
- Title: ${title}
- Excerpt: ${excerpt}
- Category: ${category}
- Search term used: "${searchTerm}"

EVALUATION CRITERIA:
1. Representation: Does the image feature diverse families, particularly Black mothers and families?
2. Relevance: Does the image relate to the blog post's specific maternity/pregnancy topic?
3. Tone: Is the image warm, supportive, and reassuring (not clinical or scary)?
4. Quality: Is the image professional, well-lit, and high resolution?
5. Authenticity: Does it feel authentic and relatable (not overly staged stock photo)?
6. Context: Is the setting appropriate for maternity/healthcare content?

POSITIVE criteria (increases confidence):
- Features Black mothers, families, or babies
- Shows diverse family structures and skin tones
- Warm, supportive, and reassuring imagery
- Professional quality, good lighting
- Authentic, relatable representation
- Relevant to pregnancy, birth, or postnatal care context
- NHS/UK healthcare appropriate imagery
- High resolution, suitable for featured image

NEGATIVE criteria (decreases confidence):
- Generic stock photo feel
- Not relevant to maternity/pregnancy topics
- Clinical, medical, or anxiety-inducing imagery
- Stereotypical or tokenistic representation
- American-specific healthcare imagery (obvious US hospital settings)
- Poor representation or lack of diversity
- Low quality or poor lighting
- Overly posed or artificial looking
- Text overlays or watermarks
- Distressing or graphic medical content

Analyze the attached image and determine if it's a good match for this blog post.`;

  try {
    const { object: evaluation } = await generateObject({
      model: models.vision,
      schema: imageEvaluationSchema,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image", image: imageUrl },
          ],
        },
      ],
    });

    return evaluation;
  } catch (error) {
    // If evaluation fails, return a neutral result that allows the image to be used
    console.error("Image evaluation failed:", error);
    return {
      isRelevant: true,
      confidence: 50,
      reasoning: "Evaluation failed, defaulting to accept image",
      concerns: ["Evaluation error - could not analyze image"],
    };
  }
}

/**
 * Evaluate multiple images and return the best match
 *
 * Evaluates images in parallel and returns the one with highest confidence
 * that meets the minimum threshold, or null if none qualify.
 */
export async function findBestImage(
  images: Array<{ url: string; searchTerm: string }>,
  context: { title: string; excerpt: string; category: string },
  minConfidence: number = 60
): Promise<{
  selectedIndex: number | null;
  evaluations: ImageEvaluation[];
}> {
  // Evaluate all images in parallel
  const evaluations = await Promise.all(
    images.map((img) =>
      evaluateImageRelevance({
        ...context,
        imageUrl: img.url,
        searchTerm: img.searchTerm,
        minConfidence,
      })
    )
  );

  // Find the best qualifying image
  let bestIndex: number | null = null;
  let bestConfidence = 0;

  evaluations.forEach((evaluation, index) => {
    if (
      evaluation.isRelevant &&
      evaluation.confidence >= minConfidence &&
      evaluation.confidence > bestConfidence
    ) {
      bestIndex = index;
      bestConfidence = evaluation.confidence;
    }
  });

  return {
    selectedIndex: bestIndex,
    evaluations,
  };
}

export { type ImageEvaluation };
