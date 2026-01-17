import { NextResponse } from "next/server"
import { z } from "zod"
import { addToResendAudience, sendFreeGuideEmail } from "@/lib/email"
import { getResourceById } from "@/lib/resources"
import { generateDownloadToken, createTokenPayload } from "@/lib/download-tokens"

// Default free guide to send with newsletter signup
const WELCOME_GUIDE_ID = "birth-preferences"

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const result = subscribeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, name } = result.data

    // Parse name into first and last name
    const nameParts = name?.trim().split(" ") || []
    const firstName = nameParts[0] || undefined
    const lastName = nameParts.slice(1).join(" ") || undefined

    // Add to Resend audience
    const audienceResult = await addToResendAudience(
      email,
      firstName || "Subscriber",
      lastName
    )

    // Check if already subscribed (Resend returns error for duplicates)
    if (!audienceResult.success && audienceResult.error) {
      const errorMessage = String(audienceResult.error)
      if (errorMessage.includes("already exists") || errorMessage.includes("duplicate")) {
        return NextResponse.json(
          { message: "You're already subscribed! Thanks for being part of our community." },
          { status: 200 }
        )
      }
    }

    // Get the welcome guide
    const guide = getResourceById(WELCOME_GUIDE_ID)
    if (!guide) {
      console.error("Welcome guide not found:", WELCOME_GUIDE_ID)
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      )
    }

    // Generate download token (7-day expiry)
    const tokenPayload = createTokenPayload(WELCOME_GUIDE_ID, email, 7)
    const token = generateDownloadToken(tokenPayload)

    // Construct download link
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.midwifedumebi.com"
    const downloadLink = `${baseUrl}/api/downloads/${WELCOME_GUIDE_ID}?token=${token}`

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

    // Send free guide email (serves as welcome + guide delivery)
    try {
      await sendFreeGuideEmail({
        to: email,
        customerName: firstName || "there",
        guideName: guide.title,
        downloadLink,
        upsellProduct,
      })
    } catch (emailError) {
      console.error("Failed to send guide email:", emailError)
      // Don't fail the subscription if email fails
    }

    console.log("Newsletter subscription with guide:", { email, firstName, lastName, guideId: WELCOME_GUIDE_ID })

    return NextResponse.json(
      { message: "Thanks for subscribing! Check your inbox for your free guide." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
