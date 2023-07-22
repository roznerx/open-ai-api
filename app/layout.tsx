import "../styles/globals.css"
import SessionProvider from "./provider"
import { Inter } from "next/font/google"

import { Metadata } from "next"
import { headers } from "next/headers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Code Genius",
    template: "%s | Code Genius",
  },
  openGraph: {
    title: "Code Genius",
    description:
      "Code Genius helps developers and companies reach their goals faster.",
    url: "https://code-genius.dev",
    siteName: "Code Genius",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)

  return (
    <>
      <html lang={lang} className={`${inter.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://code-genius.dev" />
        </head>
        <body suppressHydrationWarning={true} className="">
          <SessionProvider>
            <div className="flex min-h-screen flex-nowrap bg-purple-900">
              {children}
            </div>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
