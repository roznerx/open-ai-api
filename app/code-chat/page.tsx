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
      <main className="flex min-h-screen w-screen px-4 text-center">
        <Client session={session} />
      </main>
    </>
  )
}
