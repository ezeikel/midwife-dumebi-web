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

    const serviceId = session.metadata?.serviceId
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
      bookingDate: session.metadata?.date || undefined,
      bookingTime: session.metadata?.time || undefined,
      bookingDatetime: session.metadata?.datetime || undefined,
    }
  } catch (error) {
    console.error("Error retrieving Stripe session:", error)
    return null
  }
}
