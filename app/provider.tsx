"use client";

import { SandpackProvider } from "@codesandbox/sandpack-react";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }) {
  return (
    <>
      <Analytics />
      <SessionProvider>{children}</SessionProvider>;
    </>
  );
}
