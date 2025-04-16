import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
      </Head>
      <body>
        <title>Pink's KDS: Krazy Display Service</title>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
