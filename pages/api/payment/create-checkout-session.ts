import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const priceId =
      process.env.NODE_ENV === "production"
        ? "price_1IlgkBA5obl98iViK9CguaQr"
        : "price_1IlNPIA5obl98iViOBypvOWy";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/purchase-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export default handler;
