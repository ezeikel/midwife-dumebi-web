import Link from "next/link";
import BuyGuideButton from "../BuyGuideButton/BuyGuideButton";
import Nav from "../Nav/Nav";
import LogoFull from "../svgs/LogoFull";

const Header = () => (
  <header className="flex flex-wrap justify-between items-center p-8 gap-4">
    <Link href="/">
      <LogoFull className="w-[146px] h-[50px]" />
    </Link>
    <Nav />
    <BuyGuideButton />
  </header>
);

export default Header;
