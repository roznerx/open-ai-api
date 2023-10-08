import { stripe } from "@/lib/stripe"
import { getDictionary } from "app/(lang)/dictionaries"

import SideBar from "app/components/shared/SideBar"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { updateUserSubscription } from "utils/helpers"
import Link from "next/link"

const website = [{ name: "/home", value: 1230 }]

const items = [
  {
    category: "Website",
    stat: "10,234",
    data: website,
  },
]
export const metadata = {
  title: "AI Dashboard",
}

export interface Params {
  [key: string]: string | string[] | undefined
}
interface SearchParamsWithSubId extends Params {
  subId: string
  userId: string
}

export default async function Settings({
  searchParams,
}: {
  searchParams: SearchParamsWithSubId
}) {
  const { subId, userId } = searchParams

  async function deleteSubscription() {
    "use server"
    try {
      const deletedSubscription = await stripe.subscriptions.update(subId, {
        cancel_at_period_end: true,
        cancellation_details: {
          comment: "Customer deleted their Code Genius subscription.",
        },
      })
      if (deletedSubscription.cancel_at_period_end) {
        await updateUserSubscription(userId, "")
      }
    } catch (error) {
      console.error(`The was an error deleting your subscription: ${error}`)
    }

    redirect("/dashboard?action=subscription-deleted")
  }
  const session = await getServerSession(authOptions)
  const subscription: any = await stripe.subscriptions.retrieve(subId)
  console.log("subscription:", subscription)

  if (!session) {
    redirect("/?action=signUp&next=/settings")
  }

  const getSubscriptionDate = (timestamp: number | null) => {
    if (timestamp) {
      // Create a new Date object and pass the timestamp as milliseconds
      const date = new Date(timestamp * 1000)

      // Define the options for formatting the date
      const options: any = {
        year: "numeric",
        month: "long",
        day: "numeric",
      }

      // Format the date to a human-readable string
      const formatted = date.toLocaleString(undefined, options)
      return formatted
    }
  }

  const headersList = headers()
  const locale =
    headersList &&
    headersList?.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(locale)

  const numLength = subscription.plan.amount.toString().length
  const formattedNumber =
    numLength === 3
      ? subscription.plan.amount.toString().substring(0, 1)
      : subscription.plan.amount.toString().substring(0, 2)

  return (
    <>
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <main className="mx-auto flex w-full flex-col  items-center justify-center space-y-4 p-4 sm:max-w-7xl md:p-10">
        <div className="w-1/2 rounded-lg bg-[#292B45] p-4">
          <h2 className="text-left text-2xl font-bold tracking-tighter text-white">
            Premium
          </h2>
          <div className="text-sm grid grid-cols-2 gap-4 text-white">
            <div>Member since</div>
            <div className="flex justify-end">
              {getSubscriptionDate(subscription.created)}
            </div>
            <div>Trial ends in</div>
            <div className="flex justify-end">
              {getSubscriptionDate(subscription.trial_end)}
            </div>
            <div>Billing cycle start</div>
            <div className="flex justify-end">
              {" "}
              {getSubscriptionDate(subscription.billing_cycle_anchor)}
            </div>
            <div>Payment amount</div>
            <div className="flex justify-end">
              {formattedNumber} USD / Month
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <Link
              className="text-sm inline-flex h-10 items-center justify-center rounded-md border border-white px-8 font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              Button 1
            </Link>
            <Link
              className="text-sm inline-flex h-10 items-center justify-center rounded-md border border-white px-8 font-medium text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              Button 2
            </Link>
          </div>
        </div>
        <div className="mt-12 w-1/2 rounded-lg bg-[#292B45] p-4">
          <h2 className="text-left text-2xl font-bold tracking-tighter text-white">
            Payment
          </h2>
          <div className="text-sm grid grid-cols-2 gap-4 text-white">
            <div>Payment method</div>
            <div className="flex justify-end">Visa</div>
            <div>Last 4 digits</div>
            <div className="flex justify-end">3245</div>
          </div>
          <div className="mt-4 flex justify-start space-x-4">
            <Link
              className="text-sm inline-flex h-10 items-center justify-center rounded-md border border-white px-8 font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              Update payment method
            </Link>
            <Link
              className="text-sm inline-flex h-10 items-center justify-center rounded-md border border-white px-8 font-medium text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              See billing history
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
