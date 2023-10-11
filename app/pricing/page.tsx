import { getDictionary } from "app/(lang)/dictionaries"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { authOptions } from "pages/api/auth/[...nextauth]"

import Client from "./client"
import SideBar from "app/components/shared/SideBar"

export const metadata = {
  title: "Pricing",
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center bg-purple-900 text-center">
        {session && (
          <SideBar
            translations={dictionary.sidebar}
            menuTranslations={dictionary?.home?.header?.menu}
          />
        )}
        <Client translations={dictionary} session={session} />
      </main>
    </>
  )
}
