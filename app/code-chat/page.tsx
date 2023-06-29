import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Client from "./client"
import { cookies } from "next/headers"
import { getDictionary } from "app/(lang)/dictionaries"
import SideBar from "app/components/shared/SideBar"

export const metadata = {
  title: "Code Chat",
  description: "Code Chat is a fun way to learn how to code.",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/?action=authenticate&referer=/code-chat")
  }

  const cookieStore = cookies()
  const locale = cookieStore.get("locale") || { value: "en" }

  const dictionary = await getDictionary(locale?.value as string)

  return (
    <>
      <SideBar translations={dictionary.sidebar} />
      <main className="flex min-h-screen w-screen px-4 text-center">
        <Client session={session} translations={dictionary?.chat} />
      </main>
    </>
  )
}
