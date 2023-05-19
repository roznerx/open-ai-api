import Footer from "app/components/Footer"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Client from "./client"

export const metadata = {
  title: "Create Genius | Terms and Conditions",
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex min-h-screen flex-nowrap">
      <div className="mx-auto max-w-max pb-10">
        <Client session={session} />
        <Footer session={session} />
      </div>
    </div>
  )
}
