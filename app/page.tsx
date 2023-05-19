import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { cookies } from "next/headers"
import Client from "./client"
import Footer from "./components/Footer"

import { harperClient } from "@/lib/harperdb"

export const metadata = {
  title: "Create Genius Code with AI",
  description:
    "Code Genius is the developer's best friend. A tool that will help find solutions quickly and avoid repetitive tasks. Use it to enhance code quality and chat with an expert coding assistant.",
}
export default async function Page() {
  let loggedUserData
  const cookieStore = cookies()
  const session = await getServerSession(authOptions)
  const userIp = cookieStore.get("user-ip")?.value || ""

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
      <main className={`mx-auto max-w-max pb-10`}>
        <Client
          loggedUserData={loggedUserData}
          session={session}
          userHasAccount={userHasAccount}
          ip={userIp}
          apiCalls={userUsage?.apiCalls}
        />
        <Footer session={session} />
      </main>
    </>
  )
}

{
  /* <Subscription /> */
}
