import { Inter } from "next/font/google"
import { Suspense } from "react"
import Nav from "./components/nav"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`h-full w-full bg-gray-50 font-sans ${inter.variable}`}>
      <Suspense>
        <Nav />
      </Suspense>
      {children}
    </div>
  )
}
