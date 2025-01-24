import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/daisy-hexagon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/daisy-hexagon.png"
        />
        <meta name="theme-color" content="#f97316" />
        <meta property="og:title" content="Daisy Feeder 2" />
        <meta
          property="og:description"
          content="Log Daisy's food intake; praise the Dais!"
        />
        <meta property="og:image" content="/images/daisy_splash_2.jpg" />
        <meta property="og:url" content="https://daisyfeeder2.in" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
