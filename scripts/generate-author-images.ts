/**
 * Script to generate author images using Gemini 3 Pro Image
 *
 * Run with: npx dotenv-cli -e .env.local -- npx tsx scripts/generate-author-images.ts
 */

import { createClient } from "@sanity/client";
import { google } from "@ai-sdk/google";
import { experimental_generateImage as generateImage } from "ai";

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

// Author type from Sanity
interface Author {
  _id: string;
  name: string;
  title?: string;
  bio?: string;
  image?: {
    asset?: { _ref: string };
  };
}

/**
 * Generate a professional headshot prompt based on author name
 */
function generatePrompt(name: string, title?: string): string {
  // Try to infer characteristics from the name for diversity
  const role = title || "healthcare professional";

  return `Professional headshot portrait of a ${role} named ${name}.
The person should look warm, approachable, and professional.
NHS healthcare setting aesthetic.
Soft, natural lighting.
Neutral background with subtle warm tones.
High quality, photorealistic portrait.
The person should appear friendly and trustworthy.
No text or watermarks.`;
}

/**
 * Generate image using Gemini 3 Pro Image
 */
async function generateAuthorImage(author: Author): Promise<Buffer | null> {
  const prompt = generatePrompt(author.name, author.title);

  console.log(`Generating image for ${author.name}...`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);

  try {
    const result = await generateImage({
      model: google.image("imagen-3.0-generate-002"),
      prompt,
      size: "1024x1024",
      providerOptions: {
        google: {
          aspectRatio: "1:1",
        },
      },
    });

    if (result.image?.uint8Array) {
      return Buffer.from(result.image.uint8Array);
    }

    console.error(`No image generated for ${author.name}`);
    return null;
  } catch (error) {
    console.error(`Error generating image for ${author.name}:`, error);
    return null;
  }
}

/**
 * Upload image to Sanity
 */
async function uploadToSanity(
  buffer: Buffer,
  filename: string
): Promise<{ _type: "reference"; _ref: string }> {
  const asset = await client.assets.upload("image", buffer, {
    filename,
  });

  return {
    _type: "reference",
    _ref: asset._id,
  };
}

/**
 * Main function
 */
async function main() {
  console.log("Fetching authors from Sanity...\n");

  // Fetch all authors
  const authors = await client.fetch<Author[]>(
    `*[_type == "author"]{_id, name, title, bio, image}`
  );

  console.log(`Found ${authors.length} authors\n`);

  // Filter authors without images
  const authorsWithoutImages = authors.filter((a) => !a.image?.asset?._ref);

  console.log(`Authors without images: ${authorsWithoutImages.length}\n`);

  if (authorsWithoutImages.length === 0) {
    console.log("All authors already have images!");
    return;
  }

  // List authors
  console.log("Authors to generate images for:");
  authorsWithoutImages.forEach((a, i) => {
    console.log(`  ${i + 1}. ${a.name}${a.title ? ` (${a.title})` : ""}`);
  });
  console.log("");

  // Generate images
  const results: { name: string; success: boolean; error?: string }[] = [];

  for (const author of authorsWithoutImages) {
    try {
      // Generate image
      const imageBuffer = await generateAuthorImage(author);

      if (!imageBuffer) {
        results.push({ name: author.name, success: false, error: "No image generated" });
        continue;
      }

      // Upload to Sanity
      const slug = author.name.toLowerCase().replace(/\s+/g, "-");
      const assetRef = await uploadToSanity(imageBuffer, `author-${slug}.png`);

      // Update author document
      await client
        .patch(author._id)
        .set({
          image: {
            _type: "image",
            asset: assetRef,
            alt: `Portrait of ${author.name}`,
          },
        })
        .commit();

      console.log(`✓ Updated ${author.name} with new image\n`);
      results.push({ name: author.name, success: true });

      // Rate limiting - wait between generations
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`✗ Failed to process ${author.name}:`, error);
      results.push({
        name: author.name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Summary
  console.log("\n=== SUMMARY ===");
  console.log(`Total processed: ${results.length}`);
  console.log(`Successful: ${results.filter((r) => r.success).length}`);
  console.log(`Failed: ${results.filter((r) => !r.success).length}`);

  const failures = results.filter((r) => !r.success);
  if (failures.length > 0) {
    console.log("\nFailed authors:");
    failures.forEach((f) => {
      console.log(`  - ${f.name}: ${f.error}`);
    });
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
