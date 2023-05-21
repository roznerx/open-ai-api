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
        <div className="container mx-auto my-6 px-4 pt-20 lg:px-0">
          <h1 className="mx-auto mb-3 w-[80%] text-4xl font-bold text-white dark:text-white sm:w-[100%] sm:text-6xl sm:leading-none sm:tracking-tight">
            Only pay what you use
          </h1>
          <p className="mx-auto mt-8 w-[90%] text-gray-200 sm:w-full">
            No hidden fees. No surprise bills. No subscription bills. Only pay
            what you use.
          </p>
        </div>
        <Client session={session} />
      </main>
    </>
  )
}
