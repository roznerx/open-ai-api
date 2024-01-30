import { headers } from "next/headers"

import Client from "./client"
import { getDictionary } from "./(lang)/dictionaries"

export const metadata = {
  title: "Code Genius | AI code generator for React, Vue JS, Tailwind CSS",
  description:
    "Code Genius is a AI  code generator tool that will help you with your daily programming tasks.",
}

export default async function Page() {
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <main className="overflow-x-hidden">
      <Client translations={dictionary} />
    </main>
  )
}
