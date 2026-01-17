import { NextResponse } from "next/server"
import { z } from "zod"
import { addToResendAudience, sendNewsletterWelcome } from "@/lib/email"

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

    // Send welcome email
    try {
      await sendNewsletterWelcome({
        to: email,
        subscriberName: firstName,
      })
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the subscription if welcome email fails
    }

    console.log("Newsletter subscription:", { email, firstName, lastName })

    return NextResponse.json(
      { message: "Thanks for subscribing! Check your inbox for a welcome email." },
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
