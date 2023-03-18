import "../styles/globals.css"
import SessionProvider from "./provider"
import Header from "app/components/Header"
import Footer from "app/components/Footer"
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { Poppins } from "@next/font/google"

// const roboto = Roboto_Mono({
//   variable: "--font-roboto",
// })

const popins = Poppins({
  variable: "--font-popins",
  weight: ["100", "300", "600"],
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <html lang="en" className={`${popins.variable} font-popins`}>
        <body>
          <SessionProvider>
            <Header session={session} />
            <div className="flex min-h-screen flex-wrap  bg-white dark:bg-gradient-to-b dark:from-purple-600 dark:via-purple-700 dark:to-purple-800">
              {children}
            </div>
            <Footer />
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
