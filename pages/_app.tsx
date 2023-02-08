import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
