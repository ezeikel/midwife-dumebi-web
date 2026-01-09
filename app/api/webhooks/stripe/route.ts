import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"
import { getServiceById } from "@/lib/services"
import { createBooking } from "@/lib/cal"
import {
  sendBookingConfirmation,
  sendPurchaseConfirmation,
  sendAdminBookingNotification,
} from "@/lib/email"
import {
  createCalendarEventData,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateICSDownloadUrl,
} from "@/lib/calendar"

const webhookSecret = process.env.STRIPE_ENDPOINT_SECRET

/**
 * Handle checkout.session.completed event
 * - For digital products: send download email
 * - For sessions/packages: create Cal.com booking and send confirmation email
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || "Customer"

  if (!metadata?.serviceId) {
    console.error("Missing serviceId in session metadata")
    return
  }

  if (!customerEmail) {
    console.error("Missing customer email")
    return
  }

  const service = getServiceById(metadata.serviceId)
  if (!service) {
    console.error("Service not found:", metadata.serviceId)
    return
  }

  console.log("Processing checkout for:", {
    serviceId: service.id,
    serviceType: service.type,
    customerEmail,
  })

  // Handle digital products (no booking needed)
  if (service.type === "digital") {
    try {
      await sendPurchaseConfirmation({
        to: customerEmail,
        customerName,
        productName: service.title,
        // TODO: Generate secure download link or use S3 presigned URL
        downloadLink: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/downloads/${service.id}?session=${session.id}`,
      })
      console.log("Purchase confirmation email sent for digital product:", service.title)
    } catch (error) {
      console.error("Failed to send purchase confirmation email:", error)
    }
    return
  }

  // Handle session/package bookings
  const bookingDate = metadata.date
  const bookingTime = metadata.time
  const bookingDatetime = metadata.datetime

  if (!bookingDatetime) {
    console.log("No booking datetime provided - customer will schedule later")
    // For packages or when no time selected, just send a welcome email
    // TODO: Implement separate email for "schedule your session" flow
    return
  }

  // Create booking in Cal.com if configured
  let zoomLink: string | undefined

  if (process.env.CAL_API_KEY && service.calEventTypeId) {
    try {
      const booking = await createBooking({
        eventTypeId: service.calEventTypeId,
        start: bookingDatetime,
        name: customerName,
        email: customerEmail,
        notes: `Paid via Stripe. Session ID: ${session.id}`,
      })

      zoomLink = booking.meetingUrl || booking.location
      console.log("Cal.com booking created:", booking.uid, "Video call link:", zoomLink)
    } catch (error) {
      console.error("Failed to create Cal.com booking:", error)
      // Continue to send email even if Cal.com booking fails
      // Admin will need to manually create the booking
    }
  } else {
    console.log("Cal.com not configured - booking not created automatically")
  }

  // Generate calendar event data for email links
  const durationMinutes = service.duration ? parseInt(service.duration) : 60
  const calendarEvent = createCalendarEventData({
    serviceName: service.title,
    startTime: bookingDatetime,
    durationMinutes,
    zoomLink,
  })

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://midwifedumebi.com"
  const googleCalendarUrl = generateGoogleCalendarUrl(calendarEvent)
  const outlookCalendarUrl = generateOutlookCalendarUrl(calendarEvent)
  const icsDownloadUrl = generateICSDownloadUrl(baseUrl, calendarEvent)

  const formattedDate = bookingDate || new Date(bookingDatetime).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const formattedTime = bookingTime || new Date(bookingDatetime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })

  // Send booking confirmation email to customer
  try {
    await sendBookingConfirmation({
      to: customerEmail,
      customerName,
      serviceName: service.title,
      date: formattedDate,
      time: formattedTime,
      duration: service.duration,
      zoomLink,
      googleCalendarUrl,
      outlookCalendarUrl,
      icsDownloadUrl,
    })
    console.log("Booking confirmation email sent")
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error)
  }

  // Send notification to admin (Dumebi)
  try {
    await sendAdminBookingNotification({
      customerName,
      customerEmail,
      serviceName: service.title,
      date: formattedDate,
      time: formattedTime,
      duration: service.duration,
      amountPaid: session.amount_total || 0,
      zoomLink,
    })
    console.log("Admin booking notification sent")
  } catch (error) {
    console.error("Failed to send admin notification:", error)
  }
}

export const POST = async (request: Request) => {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  let event: Stripe.Event

  try {
    // Verify webhook signature in production
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } else {
      // Fallback for local development without signature verification
      console.warn("Webhook signature not verified - running in development mode")
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment succeeded:", paymentIntent.id)
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment failed:", paymentIntent.id, paymentIntent.last_payment_error?.message)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
