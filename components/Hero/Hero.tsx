import clsx from "clsx";
import SubscribeForm from "../forms/SubscribeForm/SubscribeForm";

type HeroProps = {
  className?: string;
};

const Hero = ({ className }: HeroProps) => (
  <div
    className={clsx(
      "flex relative p-8 bg-[rgba(243,_205,_194,_0.5)] h-full md:bg-hero bg-no-repeat bg-right-top bg-contain",
      {
        [className as string]: !!className,
      },
    )}
  >
    <div className="md:w-1/2 max-w-3xl flex flex-col md:justify-center">
      <h1 className="text-5xl md:text-6xl font-bennet-banner text-gray-700 mb-16 md:leading-[64px] leading-[52px]">
        A platform for maternal health related information
      </h1>
      <p className="flex font-catamaran mb-8 text-lg text-gray-700">
        Subscribe to our mailing list for updates.
      </p>
      <SubscribeForm />
    </div>
  </div>
);

export default Hero;
