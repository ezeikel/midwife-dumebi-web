import { NextResponse } from "next/server";
import {
  generateRandomBlogPost,
  getBlogGenerationStats,
} from "@/app/actions/blog";

// Allow up to 5 minutes for blog generation
export const maxDuration = 300;

// Disable static generation for this route
export const dynamic = "force-dynamic";

/**
 * GET /api/blog/generate
 *
 * Generates a new blog post using AI and stores it in Sanity.
 * This endpoint is called by Vercel Cron daily.
 *
 * Security: In production, this should be protected by a secret key
 * to prevent unauthorized generation.
 */
export async function GET(request: Request) {
  try {
    // Optional: Verify cron secret for production security
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is set, require it for authorization
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Allow Vercel cron requests (they use CRON_SECRET automatically)
      const vercelCron = request.headers.get("x-vercel-cron");
      if (!vercelCron) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    // Get current stats before generation
    const statsBefore = await getBlogGenerationStats();

    // Check if all topics are covered
    if (statsBefore.remaining === 0) {
      return NextResponse.json({
        success: true,
        message: `All ${statsBefore.total} topics have been covered. Consider adding new topics.`,
        stats: statsBefore,
      });
    }

    // Generate a new blog post
    console.log(
      `Starting blog generation. ${statsBefore.remaining} topics remaining.`
    );
    const result = await generateRandomBlogPost();

    // Get updated stats
    const statsAfter = await getBlogGenerationStats();

    return NextResponse.json({
      ...result,
      stats: statsAfter,
    });
  } catch (error) {
    console.error("Blog generation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to generate blog post",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog/generate
 *
 * Alternative endpoint for manual triggering.
 * Redirects to GET for consistency.
 */
export async function POST(request: Request) {
  return GET(request);
}
