import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/daisy-hexagon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/daisy-hexagon.png"
        />
        <meta name="theme-color" content="#f97316" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
