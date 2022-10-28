import Link from "next/link";
import BuyGuideButton from "../BuyGuideButton/BuyGuideButton";
import LogoText from "../LogoText/LogoText";
import Nav from "../Nav/Nav";

const Header = () => (
  <header className="flex flex-wrap justify-between items-center p-8 gap-4">
    <Link href="/">
      <a>
        <LogoText className="text-gray-900" />
      </a>
    </Link>
    <Nav />
    <BuyGuideButton />
  </header>
);

export default Header;
