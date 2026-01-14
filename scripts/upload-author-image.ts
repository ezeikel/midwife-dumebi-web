/**
 * Script to upload Dumebi's author image to Sanity
 *
 * Usage: npx tsx scripts/upload-author-image.ts
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local
config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing required environment variables:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "✓" : "✗");
  console.error("- SANITY_API_TOKEN:", token ? "✓" : "✗");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const AUTHOR_ID = "ddc3ef83-297e-435e-88f5-e971b620a2f5";
const IMAGE_PATH = path.join(process.cwd(), "public/images/dumebi.png");

async function uploadAuthorImage() {
  console.log("Reading image from:", IMAGE_PATH);

  if (!fs.existsSync(IMAGE_PATH)) {
    console.error("Image file not found:", IMAGE_PATH);
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  console.log("Image size:", imageBuffer.length, "bytes");

  console.log("Uploading image to Sanity...");
  const asset = await client.assets.upload("image", imageBuffer, {
    filename: "dumebi-author-photo.png",
  });

  console.log("Asset uploaded:", asset._id);

  console.log("Updating author document...");
  const result = await client
    .patch(AUTHOR_ID)
    .set({
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    })
    .commit();

  console.log("Author document updated:", result._id);
  console.log("\nDone! The author image has been uploaded and linked.");
  console.log("Note: If the document was published, this creates a draft.");
  console.log("You may need to publish it in Sanity Studio.");
}

uploadAuthorImage().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
