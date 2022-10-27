import Link from "next/link";

const NAV_ITEMS = [
  {
    url: "/",
    label: "Home",
  },
  // {
  //   url: "/about",
  //   label: "About",
  // },
  // {
  //   url: "/blog",
  //   label: "Blog",
  // },
];

const Nav = () => (
  <nav className="flex flex-col md:flex-row items-center ml-auto">
    <ul className="flex gap-x-4 items-center">
      {NAV_ITEMS.map(({ url, label }) => (
        <li key={url}>
          <Link href={url}>
            <a className="text-gray-900 font-catamaran text-xl">{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
