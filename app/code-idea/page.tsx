import { getDictionary } from "app/(lang)/dictionaries"
import { getServerSession } from "next-auth/next"
import { cookies } from "next/headers"
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

  const cookieStore = cookies()
  const locale = cookieStore.get("locale") || { value: "en" }

  const dictionary = await getDictionary(locale?.value as string)

  return (
    <main className="flex w-full flex-row items-start justify-start bg-purple-900 font-sans">
      <Container translations={dictionary} session={session} />
    </main>
  )
}
