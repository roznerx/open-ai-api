import { getServerSession } from "next-auth"
import { headers, cookies } from "next/headers"

import { authOptions } from "pages/api/auth/[...nextauth]"

import Client from "./client"
import Footer from "./components/Footer"
import { harperClient } from "@/lib/harperdb"
import { getDictionary } from "./(lang)/dictionaries"
import SideBar from "./components/shared/SideBar"

export const metadata = {
  title: "Code Genius | Enhance your coding skills with the help of AI",
  description:
    "Code Genius is the AI tool that will help you find solutions quickly and avoid repetitive tasks. Use it to improve code quality and chat with an expert coding assistant.",
}

export default async function Page() {
  let loggedUserData

  const session = await getServerSession(authOptions)
  const cookieStore = cookies()
  const userIp = cookieStore.get("user-ip")?.value || ""
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  const anonymousUserData = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.Trials WHERE ip = "${userIp}"`,
  })
  //@ts-ignore
  if (session && session.user?.id) {
    loggedUserData = await harperClient({
      operation: "sql",
      //@ts-ignore
      sql: `SELECT * FROM Auth.Users WHERE id = "${session.user?.id}"`,
    })
  }

  const userUsage = (anonymousUserData && anonymousUserData[0]) || {}
  const csrfTokenValue = cookieStore.has("next-auth.csrf-token")

  return (
    <>
      <div className="flex min-h-screen flex-nowrap bg-purple-900">
        {session && (
          <SideBar
            translations={dictionary.sidebar}
            menuTranslations={dictionary?.home?.header?.menu}
          />
        )}
        <main>
          <Client
            translations={dictionary}
            loggedUserData={loggedUserData}
            session={session}
            userHasAccount={csrfTokenValue}
            ip={userIp}
            apiCalls={userUsage?.apiCalls}
          />
          <Footer session={session} translations={dictionary?.footer} />
        </main>
      </div>
    </>
  )
}
