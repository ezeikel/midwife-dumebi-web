import { NextResponse } from "next/server"

// Webhook endpoint for Stripe events
// In production, verify the webhook signature using STRIPE_WEBHOOK_SECRET
export const POST = async (request: Request) => {
  const body = await request.text()

  // Placeholder: Add webhook signature verification in production
  // const sig = request.headers.get('stripe-signature')
  // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)

  try {
    const event = JSON.parse(body)

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object

        // Placeholder: Save purchase data to database
        // {
        //   session_id: session.id,
        //   email: session.customer_details?.email,
        //   service_id: session.metadata?.service_id,
        //   service_slug: session.metadata?.service_slug,
        //   cal_link: session.metadata?.cal_link,
        //   purchased_at: new Date().toISOString(),
        // }

        console.log("Checkout completed:", {
          sessionId: session.id,
          email: session.customer_details?.email,
          serviceId: session.metadata?.service_id,
        })
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object
        console.log("Payment succeeded:", paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
