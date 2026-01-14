import { NextRequest, NextResponse } from "next/server"
import { getResourceById } from "@/lib/resources"
import { generateDownloadToken, createTokenPayload } from "@/lib/download-tokens"
import { sendFreeGuideEmail, addToResendAudience, sendAdminNotification } from "@/lib/email"

type RequestBody = {
  email: string
  name: string
  guideId: string
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_FRONTEND_URL || "https://midwifedumebi.com"
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { email, name, guideId } = body

    // Validate required fields
    if (!email || !name || !guideId) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, and guideId are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Get the guide resource
    const guide = getResourceById(guideId)
    if (!guide) {
      return NextResponse.json(
        { error: "Guide not found" },
        { status: 404 }
      )
    }

    // Ensure it's a free guide
    if (guide.type !== "free-guide") {
      return NextResponse.json(
        { error: "This resource is not a free guide" },
        { status: 400 }
      )
    }

    // Generate download token (7-day expiry)
    const tokenPayload = createTokenPayload(guideId, email, 7)
    const token = generateDownloadToken(tokenPayload)

    // Construct download link
    const baseUrl = getBaseUrl()
    const downloadLink = `${baseUrl}/api/downloads/${guideId}?token=${token}`

    // Build upsell info if there's an upsell product
    let upsellProduct: {
      title: string
      description: string
      price: string
      checkoutUrl: string
    } | undefined

    if (guide.upsellProductId) {
      const upsellResource = getResourceById(guide.upsellProductId)
      if (upsellResource && upsellResource.type === "paid-product") {
        upsellProduct = {
          title: upsellResource.title,
          description: upsellResource.description,
          price: upsellResource.priceDisplay || "£0.99",
          checkoutUrl: `${baseUrl}/checkout/${upsellResource.slug}`,
        }
      }
    }

    // Extract first and last name
    const nameParts = name.trim().split(" ")
    const firstName = nameParts[0] || name
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined

    // Send the free guide email first (customer-facing, highest priority)
    await sendFreeGuideEmail({
      to: email,
      customerName: firstName,
      guideName: guide.title,
      downloadLink,
      upsellProduct,
    })

    console.log("Free guide email sent:", {
      guideId,
      email,
      name: firstName,
    })

    // Run remaining tasks sequentially to avoid Resend rate limits (2 req/sec)
    try {
      // Add to Resend Audiences (this is an API call that counts toward rate limit)
      await addToResendAudience(email, firstName, lastName)
    } catch (error) {
      console.error("Failed to add to Resend Audience:", error)
    }

    // Small delay before admin notification
    await new Promise((resolve) => setTimeout(resolve, 600))

    try {
      // Send admin notification
      await sendAdminNotification("free_guide", {
        customerName: name,
        customerEmail: email,
        itemName: guide.title,
      })
    } catch (error) {
      console.error("Failed to send admin notification for free guide:", error)
    }

    return NextResponse.json({
      success: true,
      message: "Guide sent to your email!",
    })
  } catch (error) {
    console.error("Free guide request error:", error)
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    )
  }
}
