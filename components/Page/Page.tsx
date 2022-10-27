import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Meta from "./Meta";

type PageProps = {
  children: ReactNode;
};

const Page = ({ children }: PageProps) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col flex-1 md:h-[calc(100vh_-_122px)]">
          {children}
        </main>
        <Footer />
        <ToastContainer
          position="bottom-center"
          draggable
          hideProgressBar
          pauseOnHover
          autoClose={3000}
          className="m-4 z-10 p-0 fixed bottom-0 right-0 left-0 transition-all"
          toastClassName="flex justify-center p-4 bg-green-500 rounded transition-all"
          bodyClassName="text-center text-white font-catamaran p-0"
        />
      </div>
    </>
  );
};

export default Page;
