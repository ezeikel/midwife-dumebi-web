import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Check if Sanity is configured
const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

// Read-only client for fetching data (CDN-backed)
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

// Write client for server-side mutations (requires API token)
export const writeClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Export configuration status for conditional rendering
export { isSanityConfigured };

// Image URL builder
const builder = createImageUrlBuilder(client);

// Sanity image source type
type SanityImageSource = {
  _type?: string;
  asset?: { _ref?: string; _id?: string };
  url?: string;
} | string;

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Upload image to Sanity from URL
export async function uploadImageToSanity(
  imageUrl: string,
  filename: string
): Promise<{ _type: "reference"; _ref: string }> {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const asset = await writeClient.assets.upload("image", Buffer.from(buffer), {
    filename,
  });

  return {
    _type: "reference",
    _ref: asset._id,
  };
}
