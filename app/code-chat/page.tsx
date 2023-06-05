import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Client from "./client"

export const metadata = {
  title: "Code Chat",
  description: "Code Chat is a fun way to learn how to code.",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/?action=authenticate&referer=/code-chat")
  }

  return (
    <>
      <main className="flex h-screen w-screen items-center justify-center px-4 text-center sm:h-screen">
        <Client session={session} />
      </main>
    </>
  )
}
