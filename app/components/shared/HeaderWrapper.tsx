import Header from "../Header"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function HeaderWrapper({ translations }) {
  const session = await getServerSession(authOptions)
  console.log("session:", session)
  return (
    <>
      <Header translations={translations} session={session} />
    </>
  )
}
