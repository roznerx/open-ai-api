import "../styles/globals.css"
import SessionProvider from "./provider"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Metadata } from "next"
import HeaderWrapper from "./components/shared/HeaderWrapper"
import { getDictionary } from "./(lang)/dictionaries"
import SideBar from "./components/shared/SideBar"
import Footer from "./components/Footer"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { SignInModal } from "./components/modals/SignInModal"
import Script from "next/script"

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
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://code-genius.dev" />
        </head>
        <body className="w-full overflow-x-hidden">
          <SessionProvider>
            <div className="flex min-h-screen bg-purple-900">
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
            <SignInModal signInTranslations={translations.modals.signIn} />
          </SessionProvider>
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=G-WHLZCV41W9"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
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
