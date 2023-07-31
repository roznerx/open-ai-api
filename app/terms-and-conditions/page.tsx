import { getDictionary } from "app/(lang)/dictionaries"
import Footer from "app/components/Footer"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Client from "./client"

export const metadata = {
  title: "Create Genius | Terms and Conditions",
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <div className="flex min-h-screen flex-nowrap">
      <div className="mx-auto max-w-max pb-10">
        <Client translations={dictionary.terms} />
        <Footer translations={dictionary.footer} session={session} />
      </div>
    </div>
  )
}
