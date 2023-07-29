import { cn } from "@/lib/utils"
import "../styles/globals.css"
import SessionProvider from "./provider"
import { constructMetadata } from "@/lib/utils"

import { inter } from "@/styles/fonts"

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" className={cn(inter.variable)}>
        <head>
          <link rel="canonical" href="https://code-genius.dev" />
        </head>
        <body>
          <SessionProvider>
            <div className="bg-purple-500">{children}</div>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
