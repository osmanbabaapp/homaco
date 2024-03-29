import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="ltr" className="text-white">
      <Head />
      <body className="h-full overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
