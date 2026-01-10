import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getResourceById } from "@/lib/resources"
import { validateDownloadToken } from "@/lib/download-tokens"
import { generatePresignedDownloadUrl } from "@/lib/r2"

// Lazy initialization of Stripe
let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY not configured")
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return _stripe
}

/**
 * Validate a Stripe checkout session for paid product downloads
 */
async function validateStripeSession(
  sessionId: string,
  resourceId: string
): Promise<boolean> {
  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check session is complete
    if (session.status !== "complete" && session.payment_status !== "paid") {
      return false
    }

    // Check metadata matches the resource
    const serviceId = session.metadata?.serviceId
    if (serviceId !== resourceId) {
      return false
    }

    return true
  } catch (error) {
    console.error("Stripe session validation error:", error)
    return false
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params
    const { searchParams } = new URL(request.url)

    // Get the resource
    const resource = getResourceById(resourceId)
    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    // Two authentication methods:
    // 1. Token-based (free guides)
    // 2. Stripe session-based (paid products)
    const token = searchParams.get("token")
    const sessionId = searchParams.get("session")

    if (resource.type === "free-guide") {
      // Validate token for free guides
      if (!token) {
        return NextResponse.json(
          { error: "Download token required" },
          { status: 401 }
        )
      }

      const payload = validateDownloadToken(token, resourceId)
      if (!payload) {
        return NextResponse.json(
          { error: "Invalid or expired download token" },
          { status: 403 }
        )
      }

      console.log("Free guide download:", {
        resourceId,
        email: payload.email,
      })
    } else if (resource.type === "paid-product") {
      // Validate Stripe session for paid products
      if (!sessionId) {
        return NextResponse.json(
          { error: "Stripe session ID required" },
          { status: 401 }
        )
      }

      const isValid = await validateStripeSession(sessionId, resourceId)
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid or expired session" },
          { status: 403 }
        )
      }

      console.log("Paid product download:", {
        resourceId,
        sessionId,
      })
    }

    // Generate presigned URL and redirect
    const presignedUrl = await generatePresignedDownloadUrl(
      resource.r2Key,
      resource.fileName,
      { expiresIn: 3600 } // 1 hour for immediate download
    )

    // Redirect to the presigned URL
    return NextResponse.redirect(presignedUrl)
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    )
  }
}
