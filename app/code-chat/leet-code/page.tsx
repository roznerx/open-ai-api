import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import Client from "./client"
import { headers } from "next/headers"
import { getDictionary } from "app/(lang)/dictionaries"

export const metadata = {
  title: "Code Chat",
  description: "Code Chat is a fun way to learn how to code.",
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <main className="z-0 flex h-screen w-full items-start justify-center bg-[radial-gradient(at_bottom_center,_var(--tw-gradient-stops))] from-black to-violet-950">
      <Client session={session} translations={dictionary?.chat} />
    </main>
  )
}
