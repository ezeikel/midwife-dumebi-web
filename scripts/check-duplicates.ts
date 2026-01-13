/**
 * Check for duplicate Pexels images across blog posts
 */

import { client } from "../lib/sanity/client";

async function main() {
  const posts = await client.fetch<Array<{
    _id: string;
    title: string;
    pexelsPhotoId?: string;
    imageSource?: string;
  }>>(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "pexelsPhotoId": generationMeta.pexelsPhotoId,
    "imageSource": generationMeta.imageSource
  }`);

  console.log(`Total posts: ${posts.length}`);

  // Check for duplicates
  const pexelsIds = posts.filter(p => p.pexelsPhotoId).map(p => p.pexelsPhotoId!);
  const idCounts: Record<string, number> = {};
  pexelsIds.forEach(id => {
    idCounts[id] = (idCounts[id] || 0) + 1;
  });

  const duplicateIds = Object.entries(idCounts).filter(([_, count]) => count > 1);

  console.log(`\nPexels images: ${pexelsIds.length}`);
  console.log(`Gemini images: ${posts.filter(p => p.imageSource === "gemini").length}`);
  console.log(`No image source set: ${posts.filter(p => !p.imageSource).length}`);
  console.log(`\nDuplicate Pexels IDs: ${duplicateIds.length}`);

  if (duplicateIds.length > 0) {
    console.log("\nDuplicated IDs and counts:");
    duplicateIds.forEach(([id, count]) => {
      console.log(`  ${id}: used ${count} times`);
    });
  }
}

main().catch(console.error);
