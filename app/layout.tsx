import "../styles/globals.css"
import SessionProvider from "./provider"
import Header from "app/components/Header"
import Footer from "app/components/Footer"
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { Roboto_Mono } from "@next/font/google"

const roboto = Roboto_Mono({
  variable: "--font-roboto",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <html lang="en" className={`${roboto.variable} font-sans`}>
        <body>
          <SessionProvider>
            <Header session={session} />
            <div className="flex items-center justify-center bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 dark:from-slate-400 dark:to-slate-100">
              {children}
            </div>
            <Footer />
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
