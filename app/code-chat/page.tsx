import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Client from "./client"

export const metadata = {
  title: "Code Genius | Code Chat",
  description: "Code Chat is a fun way to learn to code.",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/?action=authenticate&referer=/code-chat")
  }

  return (
    <>
      <main className="flex w-[100%] flex-col items-center justify-center px-4 text-center sm:mt-10">
        <div className="flex flex-col">
          <h2 className="mx-auto mt-2 flex w-[100%] font-sans text-3xl text-gray-200">
            Code Genius Chat
          </h2>
          <p className="text-gray-200">Ask anything about code</p>
        </div>
        <Client session={session} />
      </main>
    </>
  )
}
