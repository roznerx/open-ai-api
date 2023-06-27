import { getDictionary } from "app/(lang)/dictionaries"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { authOptions } from "pages/api/auth/[...nextauth]"

import Client from "./client"

export const metadata = {
  title: "Pricing",
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  const cookieStore = cookies()
  const locale = cookieStore.get("locale") || { value: "en" }

  const dictionary = await getDictionary(locale?.value as string)

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center text-center">
        <Client translations={dictionary} session={session} />
      </main>
    </>
  )
}
