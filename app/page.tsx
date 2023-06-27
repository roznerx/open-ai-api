import { getServerSession } from "next-auth"

import { authOptions } from "pages/api/auth/[...nextauth]"
import { cookies } from "next/headers"
import Client from "./client"
import Footer from "./components/Footer"
import { harperClient } from "@/lib/harperdb"
import { getDictionary } from "./(lang)/dictionaries"

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
  const locale = cookieStore.get("locale") || { value: "en" }

  const dictionary = await getDictionary(locale?.value as string)

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
  const csrfTokenValue = cookieStore.get("next-auth.csrf-token")?.value

  const userHasAccount = csrfTokenValue !== "" && csrfTokenValue !== undefined
  return (
    <>
      <main className={`mx-auto w-full max-w-max pb-10`}>
        <Client
          translations={dictionary}
          loggedUserData={loggedUserData}
          session={session}
          userHasAccount={userHasAccount}
          ip={userIp}
          apiCalls={userUsage?.apiCalls}
        />
        <Footer session={session} translations={dictionary?.footer} />
      </main>
    </>
  )
}
