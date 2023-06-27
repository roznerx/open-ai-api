import { getDictionary } from "app/(lang)/dictionaries"
import Footer from "app/components/Footer"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Client from "./client"

export const metadata = {
  title: "Create Genius | Privacy Policy",
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  const cookieStore = cookies()
  const locale = cookieStore.get("locale") || { value: "en" }

  const dictionary = await getDictionary(locale?.value as string)

  return (
    <>
      <div className="flex min-h-screen flex-nowrap">
        <div className="mx-auto max-w-max pb-10">
          <Client translations={dictionary} session={session} />
          <Footer translations={dictionary} session={session} />
        </div>
      </div>
    </>
  )
}
