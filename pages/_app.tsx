import "../styles/globals.css";
import type { AppProps } from "next/app";
import PageWithLayoutType from "../layouts/page-with-layout";
import { ReactElement } from "react";

import { Titillium_Web } from "@next/font/google";

// layout types
type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType;
  pageProps: any;
};

const fontFamily = Titillium_Web({
  subsets: ["latin"],
  weight: ["600", "700"],
});

function MyApp({ Component, pageProps }: AppLayoutProps) {
  // setup layout
  const Layout =
    Component.layout || ((children: ReactElement) => <>{children}</>);

  return (
    <div className={fontFamily.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
