import { getDictionary } from "app/(lang)/dictionaries"
import { headers } from "next/headers"
import Client from "./client"

export const metadata = {
  title: "Create Genius | Privacy Policy",
}

export default async function Page() {
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <>
      <div className="flex min-h-screen flex-nowrap">
        <div className="mx-auto max-w-max pb-10">
          <Client translations={dictionary.privacy} />
        </div>
      </div>
    </>
  )
}
