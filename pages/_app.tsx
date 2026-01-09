import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Page from "../components/Page/Page";

// FIX: https://github.com/FortAwesome/Font-Awesome/issues/19348#issuecomment-1262137893
const { library, config } = require("@fortawesome/fontawesome-svg-core");

config.autoAddCss = false; /* eslint-disable import/first */

library.add(
  faSpinnerThird,
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
  faEnvelope,
);

const MyApp = ({ Component, pageProps, err }: AppProps & { err: any }) => {
  return (
    <Page>
      {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} err={err} />
    </Page>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await MyApp.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
