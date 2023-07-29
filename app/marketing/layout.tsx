import { Inter } from "next/font/google"
import { Suspense } from "react"
import Nav from "./components/nav"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`font-inter h-full w-full bg-gray-50 ${inter.variable}`}>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <Nav />
      </Suspense>
      {children}
    </div>
  )
}
