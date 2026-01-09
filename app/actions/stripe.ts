"use server"

import { stripe } from "@/lib/stripe"
import { getServiceById } from "@/lib/services"

type BookingSlot = {
  date: string | null
  time: string | null
  datetime: string | null
}

export const startCheckoutSession = async (serviceId: string, bookingSlot?: BookingSlot): Promise<string> => {
  const service = getServiceById(serviceId)

  if (!service) {
    throw new Error(`Service with id "${serviceId}" not found`)
  }

  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

  const metadata: Record<string, string> = {
    service_id: service.id,
    service_slug: service.slug,
    cal_link: service.calLink,
  }

  if (bookingSlot?.date) metadata.booking_date = bookingSlot.date
  if (bookingSlot?.time) metadata.booking_time = bookingSlot.time
  if (bookingSlot?.datetime) metadata.booking_datetime = bookingSlot.datetime

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
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
            metadata: {
              service_id: service.id,
              service_slug: service.slug,
              cal_link: service.calLink,
            },
          },
          unit_amount: service.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata,
  })

  if (!session.client_secret) {
    throw new Error("Failed to create checkout session")
  }

  return session.client_secret
}
