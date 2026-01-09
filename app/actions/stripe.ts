"use server"

import { stripe } from "@/lib/stripe"
import { getServiceById } from "@/lib/services"

type BookingSlot = {
  date: string | null
  time: string | null
  datetime: string | null
}

export const startCheckoutSession = async (
  serviceId: string,
  bookingSlot?: BookingSlot
): Promise<string> => {
  const service = getServiceById(serviceId)

  if (!service) {
    throw new Error(`Service with id "${serviceId}" not found`)
  }

  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

  // Metadata keys must match what the webhook handler expects
  const metadata: Record<string, string> = {
    serviceId: service.id,
    serviceSlug: service.slug,
    serviceType: service.type,
  }

  // Add booking information if provided
  if (bookingSlot?.date) metadata.date = bookingSlot.date
  if (bookingSlot?.time) metadata.time = bookingSlot.time
  if (bookingSlot?.datetime) metadata.datetime = bookingSlot.datetime

  // Determine success URL based on service type
  const successUrl =
    service.type === "digital"
      ? `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
      : `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer_creation: "always", // Ensure we always have customer details for emails
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: service.title,
            description:
              bookingSlot?.date && bookingSlot?.time
                ? `${service.description} • Scheduled for ${bookingSlot.date} at ${bookingSlot.time}`
                : service.description,
          },
          unit_amount: service.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: successUrl,
    metadata,
  })

  if (!session.client_secret) {
    throw new Error("Failed to create checkout session")
  }

  return session.client_secret
}
