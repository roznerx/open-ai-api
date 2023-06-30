import { getDictionary } from "app/(lang)/dictionaries"
import { getServerSession } from "next-auth/next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Container from "./container"

export const metadata = {
  title: "Code Idea",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <main className="flex w-full flex-row items-start justify-start bg-purple-900 font-sans">
      <Container translations={dictionary} session={session} />
    </main>
  )
}
