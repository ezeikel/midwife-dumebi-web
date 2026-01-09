import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
import handleCheckoutComplete from "../../../utils/handleCheckoutComplete";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

// Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // fulfill order
      handleCheckoutComplete(session);
    } catch (err) {
      console.error({ err });
    }
  }

  return res.status(200).json({ message: "Webhook received" });
};

export default handler;
