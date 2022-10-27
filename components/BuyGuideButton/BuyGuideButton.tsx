import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../Button/Button";
import clsx from "clsx";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  }
  return stripePromise;
};

type BuyGuideButtonProps = {
  className?: string;
};

const BuyGuideButton = ({ className }: BuyGuideButtonProps) => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        {
          price:
            process.env.NODE_ENV === "production"
              ? "price_1IlgkBA5obl98iViK9CguaQr"
              : "price_1IlNPIA5obl98iViOBypvOWy",
          quantity: 1,
        },
      ],
      successUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/purchase-success`,
      cancelUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    });

    if (error) {
      console.warn("Error:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      text="Buy The Birth Plan Assist (£0.99)"
      onClick={redirectToCheckout}
      isLoading={loading}
      className={clsx({
        [className as string]: !!className,
      })}
    />
  );
};

export default BuyGuideButton;
