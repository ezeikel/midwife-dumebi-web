import {
  IconName,
  IconPrefix,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import SubscribeForm from "../forms/SubscribeForm/SubscribeForm";
import Icon from "../Icon/Icon";
import LogoText from "../LogoText/LogoText";

type SocialLink = {
  url: string;
  icon: {
    name: IconName;
    type: IconPrefix;
    size: SizeProp;
  };
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    url: "https://www.instagram.com/midwifedumebi",
    icon: {
      name: "instagram",
      type: "fab",
      size: "2x",
    },
  },
  {
    url: "https://twitter.com/midwifedumebi",
    icon: {
      name: "twitter",
      type: "fab",
      size: "2x",
    },
  },
  {
    url: "https://www.facebook.com/midwifedumebi",
    icon: {
      name: "facebook-f",
      type: "fab",
      size: "2x",
    },
  },
  {
    url: "mailto:hi@midwifedumebi.com",
    icon: {
      name: "envelope",
      type: "fal",
      size: "2x",
    },
  },
];

const Footer = () => (
  <footer className="flex flex-col items-center p-8 bg-[#333333]">
    <LogoText className="text-white md:self-start mb-16" />
    <div className="flex flex-col  md:flex-row md:items-center md:justify-between md:gap-x-8 w-full mb-16">
      <div className="flex flex-col items-center md:items-start md:flex-none">
        <h4 className="text-white font-catamaran text-2xl mb-4">
          Let&apos;s connect
        </h4>
        <ul className="flex gap-x-6 flex-1 mb-8 md:mb-0">
          {SOCIAL_LINKS.map(({ url, icon }) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer">
                <Icon
                  name={icon.name}
                  type={icon.type}
                  size={icon.size}
                  className="text-white"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center md:items-end md:flex-1">
        <p className="flex font-catamaran mb-8 text-lg text-white text-center md:text-left">
          Subscribe to our mailing list for updates.
        </p>
        <SubscribeForm className="md:max-w-lg" />
      </div>
    </div>
    <div className="font-catamaran text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Midwife Dumebi, all rights reserved.
    </div>
  </footer>
);

export default Footer;
