import type { NextPage } from "next";
import Hero from "../components/Hero/Hero";

const IndexPage: NextPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Hero className="flex-1" />
    </div>
  );
};

export default IndexPage;
