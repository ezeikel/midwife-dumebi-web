import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
import fulfillOrder from "../../../utils/fulfillOrder";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_ec3b261aece437cd23f70b42aa6baeb1e84df6c622066cdf8edea8bb1cf5c2fb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // fulfill order
      fulfillOrder(session);
    } catch (err) {
      console.error({ err });
    }
  }

  return res.status(200).json({ message: "Webhook received" });
};

export default handler;
