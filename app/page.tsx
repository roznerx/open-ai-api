import { getServerSession } from "next-auth"

import { authOptions } from "pages/api/auth/[...nextauth]"

import Client from "./client"
import Footer from "./components/Footer"
import { getDictionary } from "./(lang)/dictionaries"
import SideBar from "./components/shared/SideBar"

export const metadata = {
  title: "Code Genius | Enhance your coding skills with the help of AI",
  description:
    "Code Genius is the AI tool that will help you find solutions quickly and avoid repetitive tasks. Use it to improve code quality and chat with an expert coding assistant.",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  const dictionary = await getDictionary("en")

  return (
    <main>
      {session && (
        <SideBar
          translations={dictionary.sidebar}
          menuTranslations={dictionary?.home?.header?.menu}
        />
      )}
      <Client translations={dictionary} session={session} />
      <Footer translations={dictionary?.footer} session={session} />
    </main>
  )
}
