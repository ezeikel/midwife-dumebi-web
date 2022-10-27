import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

type LogoTextProps = {
  className?: string;
};

const LogoText = ({ className }: LogoTextProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <h1
      className={clsx("text-3xl font-bennet-banner", {
        [className]: !!className,
      })}
    >
      {isMobile ? "BM" : "Black Midwifery"}
    </h1>
  );
};

export default LogoText;
