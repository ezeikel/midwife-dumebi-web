import { useState, MouseEvent as ReactMouseEvent } from "react";
import clsx from "clsx";
import Button from "../Button/Button";

type BuyGuideButtonProps = {
  className?: string;
};

const BuyGuideButton = ({ className }: BuyGuideButtonProps) => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      text="Buy The Birth Plan Assist (£0.99)"
      onClick={redirectToCheckout}
      isLoading={loading}
      className={clsx({
        [className!]: !!className,
      })}
    />
  );
};

export default BuyGuideButton;
