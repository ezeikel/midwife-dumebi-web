"use server"

import { stripe } from "@/lib/stripe"
import { getServiceById } from "@/lib/services"

export const verifyStripeSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"],
    })

    if (session.payment_status !== "paid") {
      return null
    }

    const serviceId = session.metadata?.service_id
    if (!serviceId) {
      return null
    }

    const service = getServiceById(serviceId)
    if (!service) {
      return null
    }

    return {
      service,
      customerEmail: session.customer_details?.email || "",
      customerName: session.customer_details?.name || "",
      bookingDate: session.metadata?.booking_date || undefined,
      bookingTime: session.metadata?.booking_time || undefined,
      bookingDatetime: session.metadata?.booking_datetime || undefined,
    }
  } catch (error) {
    console.error("Error retrieving Stripe session:", error)
    return null
  }
}
