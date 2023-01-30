import "../styles/globals.css";
import type { AppProps } from "next/app";
import PageWithLayoutType from "../layouts/page-with-layout";
import { ReactElement } from "react";

import { Titillium_Web } from "@next/font/google";
import localFont from "@next/font/local";
import MobileNavContextProvider from "../context/mobile-nav-context";

// layout types
type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType;
  pageProps: any;
};

const myFont = localFont({
  src: [
    {
      path: "../public/alarabiya-font/ArbFONTS-4_C6.ttf",
      weight: "500",
    },
    {
      path: "../public/alarabiya-font/ArbFONTS-22326-alarabiyafont.ttf",
      weight: "bold",
    },
    {
      path: "../public/alarabiya-font/ArbFONTSAlarabi-a-Normal-Font.ttf",
      weight: "normal",
    },
  ],
  // fallback: ["Helvetica", "ui-sans-serif"],
});

const fontFamily = Titillium_Web({
  subsets: ["latin"],
  weight: ["600", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  // setup layout
  // const Layout =
  //   Component.layout || ((children: ReactElement) => <>{children}</>);

  return (
    <div className={myFont.className}>
      {/* <style jsx global>{`
        body {
          font-family: ${myFont.style.fontFamily};
        }
      `}</style> */}
      <MobileNavContextProvider>
        <Component {...pageProps} />
      </MobileNavContextProvider>
    </div>
  );
}

export default MyApp;
