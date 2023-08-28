import prisma from "#/lib/prisma"
import { getDictionary } from "app/(lang)/dictionaries"
import SideBar from "app/components/shared/SideBar"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Client from "./client"

export const metadata = {
  title: "AI Dashboard",
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/?referer=/dashboard")
  }

  let opConfirmation = false
  let totalCredits: number = 0
  let purchasedCredits: number = 0
  let existingCredits: string = ""
  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)
  //@ts-ignore
  const userId = session && session.user?.id
  console.log("session:", session)
  let user
  //@ts-ignore
  if (session?.user?.id) {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  console.log("Prisma user:", user)

  const checkoutSession = await prisma.checkoutSessions.findMany({
    where: {
      userId: userId,
      credits: {
        gt: 0,
      },
    },
  })
  console.log(" Prisma CheckoutSession:", checkoutSession)

  if (user && !checkoutSession[0]) {
    totalCredits = user?.credits
  } else if (userId && user && checkoutSession[0]) {
    //Store existing credits
    existingCredits = user?.credits

    //   // console.log("checkoutSession[0]?.credits", checkoutSession[0]?.credits)

    purchasedCredits =
      checkoutSession.length > 0 ? checkoutSession[0]?.credits : 0

    totalCredits =
      purchasedCredits > 0
        ? parseInt(purchasedCredits + existingCredits, 10)
        : parseInt(existingCredits, 10)

    if (totalCredits > 0) {
      const updatedUser = {
        user,
        credits: totalCredits,
      }
      //** UPDATE USER WITH TOTAL CREDITS |  MIGRATE THIS TO PRISMA **
      // await harperClient({
      //   operation: "update",
      //   schema: "Auth",
      //   table: "Users",
      //   hash_values: [
      //     {
      //       id: userId,
      //     },
      //   ],
      //   records: [updatedUser],
      // })
    }

    //UPDATE CHECKOUT SESSION TO CONFIRMED AND SET CREDITS TO 0 |  MIGRATE THIS TO PRISMA **
    // const updatedCheckout = {
    //   ...checkoutSession[0],
    //   confirmed: true,
    //   credits: 0,
    // }

    //   if (updatedOp && updatedOp.update_hashes?.[0] !== "") {
    //     opConfirmation = true
    //     const fetchUrl = `${
    //       process.env.NEXTAUTH_URL
    //     }/api/email/generate-credits-html?name=${
    //       session?.user?.name
    //     }&credits=${purchasedCredits}&ts${new Date().getTime()}`

    //     const headers = new Headers()
    //     headers.append("Content-Type", "application/json")

    //     const response = await fetch(fetchUrl, {
    //       method: "GET",
    //       headers: headers,
    //     })
    //     const { html } = await response.json()

    //     const payload = {
    //       name: session?.user?.name,
    //       email: session?.user?.email,
    //       html,
    //     }
    //     await fetch(`${process.env.NEXTAUTH_URL}/api/email/send`, {
    //       method: "POST",
    //       next: { revalidate: 0 },
    //       body: JSON.stringify(payload),
    //     })
    //   }
  }

  return (
    <div className="flex bg-purple-900">
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <div className="mx-auto w-full dark:bg-purple-900">
        <Client
          translations={dictionary}
          session={session}
          credits={totalCredits}
          purchasedCredits={purchasedCredits}
          opConfirmation={opConfirmation}
        />
      </div>
    </div>
  )
}
