import { harperClient } from "@/lib/harperdb"
import SideBar from "app/components/shared/SideBar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Client from "./client"

export const metadata = {
  title: "AI Dashboard",
}

export default async function Dashboard() {
  let harperUser
  let opConfirmation = false
  let totalCredits: number = 0
  let purchasedCredits: number = 0
  const session = await getServerSession(authOptions)
  let existingCredits: string = ""

  if (!session) {
    redirect("/?referer=/dashboard")
  }

  //@ts-ignore
  const userId = session && session.user?.id

  //@ts-ignore
  if (session && session.user?.id) {
    harperUser = await harperClient({
      operation: "sql",
      sql: `SELECT * FROM Auth.Users WHERE id = "${userId}"`,
    })
  }
  // console.log("user in the server:", user)

  const checkoutSession = await harperClient({
    operation: "sql",
    //@ts-ignore
    sql: `SELECT * FROM Auth.CheckoutSessions WHERE userId = "${userId}" AND credits > 0 ORDER BY __createdtime__ DESC LIMIT 1`,
  })
  // console.log("checkoutSession:", checkoutSession[0])
  if (userId && harperUser[0]) {
    //Store existing credits
    existingCredits = harperUser[0]?.credits

    purchasedCredits =
      checkoutSession.length > 0 ? checkoutSession[0]?.credits : 0

    totalCredits =
      purchasedCredits > 0
        ? parseInt(purchasedCredits + existingCredits, 10)
        : parseInt(existingCredits, 10)

    if (totalCredits > 0) {
      const updatedUser = {
        ...harperUser[0],
        credits: totalCredits,
      }
      //UPDATE USER WITH TOTAL CREDITS
      await harperClient({
        operation: "update",
        schema: "Auth",
        table: "Users",
        hash_values: [
          {
            id: userId,
          },
        ],
        records: [updatedUser],
      })
    }
    //UPDATE CHECKOUT SESSION TO CONFIRMED AND SET CREDITS TO 0
    const updatedCheckout = {
      ...checkoutSession[0],
      confirmed: true,
      credits: 0,
    }

    if (checkoutSession[0]) {
      const updatedOp = await harperClient({
        operation: "update",
        schema: "Auth",
        table: "CheckoutSessions",
        hash_values: [
          {
            id: checkoutSession[0]?.id,
          },
        ],
        records: [updatedCheckout],
      })
      if (updatedOp && updatedOp.update_hashes?.[0] !== "") {
        opConfirmation = true
        // console.log("pasa por server render")
        // SendCongratsEmail(session, purchasedCredits)
      }
    }
  }

  return (
    <div className="flex flex-col">
      <SideBar setOpenSecondaryNavBar={undefined} />
      <div className="mx-auto my-12 w-full dark:bg-purple-900">
        <Client
          session={session}
          credits={totalCredits}
          purchasedCredits={purchasedCredits}
          opConfirmation={opConfirmation}
        />
      </div>
    </div>
  )
}
