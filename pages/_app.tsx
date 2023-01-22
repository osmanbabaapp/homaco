import "../styles/globals.css";
import type { AppProps } from "next/app";
import PageWithLayoutType from "../layouts/page-with-layout";
import { ReactElement } from "react";

import { Titillium_Web } from "@next/font/google";
import MobileNavContextProvider from "../context/mobile-nav-context";

// layout types
type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType;
  pageProps: any;
};

const fontFamily = Titillium_Web({
  subsets: ["latin"],
  weight: ["600", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  // setup layout
  // const Layout =
  //   Component.layout || ((children: ReactElement) => <>{children}</>);

  return (
    <div className={fontFamily.className}>
      <MobileNavContextProvider>
        <Component {...pageProps} />
      </MobileNavContextProvider>
    </div>
  );
}

export default MyApp;
