import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

import Client from "./client"

export const metadata = {
  title: "Pricing",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center px-4 text-center">
        <Client session={session} />
      </main>
    </>
  )
}
