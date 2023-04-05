import "../styles/globals.css"
import SessionProvider from "./provider"
import Header from "app/components/Header"
import Footer from "app/components/Footer"
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { Poppins } from "next/font/google"

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
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="bg-[#1D1D29]">
          <SessionProvider>
            <Header session={session} />
            <div className="flex min-h-screen flex-nowrap">{children}</div>
            {/* <Footer /> */}
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
