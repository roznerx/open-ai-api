import "../styles/globals.css"
import SessionProvider from "./provider"
import { Inter } from "next/font/google"

import { Metadata } from "next"
import HeaderWrapper from "./components/shared/HeaderWrapper"
import { getDictionary } from "./(lang)/dictionaries"
import Script from "next/script"
import SideBar from "./components/shared/SideBar"
import Footer from "./components/Footer"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Code Genius",
    template: "Code Genius - %s ",
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
  const session = await getServerSession(authOptions)
  const translations = await getDictionary("en")
  return (
    <>
      <html lang="en" className={`${inter.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://code-genius.dev" />
        </head>
        <body>
          <SessionProvider translations={translations?.modals?.signIn}>
            <div className="flex min-h-screen flex-nowrap bg-purple-900">
              {session && (
                <SideBar
                  translations={translations.sidebar}
                  menuTranslations={translations?.home?.header?.menu}
                />
              )}
              <HeaderWrapper
                session={session}
                translations={translations?.home?.header}
              />
              {children}
            </div>
            <Footer
              session={session}
              translations={translations?.footer}
              modalTranslations={translations?.dashboard.modal}
            />
          </SessionProvider>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-WHLZCV41W9"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WHLZCV41W9');`,
            }}
          />
        </body>
      </html>
    </>
  )
}
