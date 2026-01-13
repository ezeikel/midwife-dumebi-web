import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

/**
 * AI Model Configuration
 *
 * Centralized model definitions for consistent usage across the application.
 */

// Model identifiers
export const MODEL_IDS = {
  // OpenAI Text models
  GPT_4O: "gpt-4o",
  GPT_4O_MINI: "gpt-4o-mini",

  // Google Gemini models
  // Most balanced model - speed, scale, and frontier intelligence
  GEMINI_3_FLASH: "gemini-3-flash-preview",
  // Most intelligent multimodal model - best for vision/evaluation
  GEMINI_3_PRO: "gemini-3-pro-preview",
  // Image generation model (use with generateText, not generateImage)
  GEMINI_3_PRO_IMAGE: "gemini-3-pro-image-preview",
} as const;

// Pre-configured model instances
export const models = {
  // Primary text model for complex tasks (content generation)
  text: openai(MODEL_IDS.GPT_4O),

  // Faster/cheaper text model for simpler tasks (metadata, search terms)
  textFast: openai(MODEL_IDS.GPT_4O_MINI),

  // Most intelligent vision model for evaluation (Gemini 3 Pro)
  // Best for: evaluating image relevance, quality assessment
  vision: google(MODEL_IDS.GEMINI_3_PRO),

  // Gemini image generation model (uses generateText, not generateImage)
  // Best for: blog featured images when Pexels doesn't have suitable photos
  geminiImage: google(MODEL_IDS.GEMINI_3_PRO_IMAGE),
};

// Type exports
export type ModelId = (typeof MODEL_IDS)[keyof typeof MODEL_IDS];
