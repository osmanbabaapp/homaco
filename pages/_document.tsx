import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-us" className="h-full bg-slate-800 text-white">
      <Head />
      <body className="h-full overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
