import "../styles/globals.css";
import Head from "next/head";

import type { AppProps } from "next/app";
import PageWithLayoutType from "../layouts/page-with-layout";
import { ReactElement } from "react";

import { Titillium_Web } from "@next/font/google";
import localFont from "@next/font/local";
import MobileNavContextProvider from "../context/mobile-nav-context";
import { SessionProvider } from "next-auth/react";

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
    <>
    <Head>
        <link rel="shortcut icon" href="/media/dahir/dahir-123.png" />

        <meta name="google-site-verification" content="qg4zIniEUpBAY4rrmeNIR7DvFNqR71Bf9au5J3lUIxg0000000000000" />
      </Head>
    <div className={myFont.className}>
      {/* <style jsx global>{`
        body {
          font-family: ${myFont.style.fontFamily};
        }
      `}</style> */}
      <SessionProvider session={pageProps?.session}>
        <MobileNavContextProvider>
          <Component {...pageProps} />
        </MobileNavContextProvider>
      </SessionProvider>
    </div>
    </>
  );
}

export default MyApp;
