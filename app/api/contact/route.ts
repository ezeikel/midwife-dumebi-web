import { NextResponse } from "next/server"
import { z } from "zod"
import { sendContactInquiry, sendContactConfirmation } from "@/lib/email"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please enter a message (at least 10 characters)"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    // Send admin notification
    try {
      await sendContactInquiry({
        customerName: name,
        customerEmail: email,
        message,
      })
    } catch (emailError) {
      console.error("Failed to send contact inquiry to admin:", emailError)
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      )
    }

    // Small delay to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Send confirmation to user
    try {
      await sendContactConfirmation({
        to: email,
        customerName: name,
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the request if confirmation fails - admin already got the message
    }

    console.log("Contact form submission:", { name, email })

    return NextResponse.json(
      { message: "Message sent! I'll get back to you within 24 hours." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
