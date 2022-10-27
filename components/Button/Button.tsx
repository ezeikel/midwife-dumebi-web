import clsx from "clsx";
import Icon from "../Icon/Icon";

type ButtonProps = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "link";
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({
  text,
  onClick,
  className,
  type,
  variant = "primary",
  isLoading,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded text-center font-catamaran font-semibold px-8 py-4",
        {
          "border border-peach bg-peach text-white disabled:border-gray-300 disabled:bg-gray-300":
            variant === "primary",
          "border-border-gray-300 border bg-white text-grey-700":
            variant === "outline",
          "border border-transparent text-gray-700": variant === "link",
          [className as string]: !!className,
        },
      )}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {isLoading ? (
        <Icon
          name="spinner-third"
          type="fad"
          className="text-white ml-4 animate-spin"
        />
      ) : null}
    </button>
  );
};

export default Button;
