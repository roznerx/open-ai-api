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
      <main className="flex w-[100%] flex-col items-center justify-center px-4 text-center sm:mt-10">
        <div className="mt-12 flex flex-col sm:mt-2">
          <h2 className="mx-auto flex w-[100%] font-sans text-3xl text-gray-200">
            Code Genius Chat
          </h2>
          <p className="text-gray-200">Ask anything about code</p>
        </div>
        <Client session={session} />
      </main>
    </>
  )
}
