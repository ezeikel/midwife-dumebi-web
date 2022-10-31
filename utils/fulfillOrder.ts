/* eslint-disable import/no-anonymous-default-export */

import Stripe from "stripe";
import { transport, createEmail } from "./mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

export default async (session: any) => {
  const { data } = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 5,
  });

  const {
    price: { product },
  } = data[0];

  const emailInfo = {
    from: "hi@midwifedumebi.com",
    to: session.customer_details.email,
  };

  // the birth plan assist (test and live id)
  if (product === "prod_JO9ivAiDnrzmBC" || product === "prod_JOThgfTfydSS2o") {
    const message = `
      Hello ${session.customer_details.name},

      Thank you for purchasing "The Birth Plan Assist". We hope this guide helps you create the best plan for you during this exciting chapter of pregnancy & birth.

      We at Midwife Dumebi would love to hear your feedback on the guide once you've used it, feel free to email or send us a message on our Instagram page https://instagram.com/@midwifedumebi.

      Please do subscribe to our website to stay up to date with our latest blog posts, videos and other resources.

      Best wishes,

      Dumebi
      Founder of Midwife Dumebi

      https://midwifedumebi.com
    `;
    emailInfo.subject = "The Birth Plan Assist";
    emailInfo.html = createEmail(message);
    emailInfo.text = message;
    emailInfo.attachments = [
      {
        filename: "The_Birth_Plan_Assist.pdf",
        path: "https://raw.githubusercontent.com/ezeikel/midwife-dumebi-web/main/public/pdf/birth-plan-assist-2021.pdf",
      },
    ];
  } else {
    const message = "Your Order from Midwife Dumebi";
    emailInfo.subject = "Your Order from Midwife Dumebi";
    emailInfo.html = createEmail(message);
    emailInfo.text = message;
  }

  try {
    await transport.sendMail(emailInfo);
    return { message: "Email sent" };
  } catch (error) {
    return { error };
  }
};
