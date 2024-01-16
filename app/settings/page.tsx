import { stripe } from "@/lib/stripe"
import { getDictionary } from "app/(lang)/dictionaries"

import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ManageSubscription from "./manage-subscription"
import { paymentPortalLink } from "utils/helprs"

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
  const { subId } = searchParams

  const session = await getServerSession(authOptions)
  const subscription: any = await stripe?.subscriptions?.retrieve(subId)

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

  const interval = subscription.plan.interval

  return (
    <>
      <main className="mx-auto flex w-full flex-col items-center justify-center space-y-4 p-4 sm:max-w-7xl md:p-12">
        {/* <CancelModal translations={dictionary} isWarningOpen={true} /> */}
        <div className="w-2/3 rounded-lg bg-purple-700 p-8">
          <p className="my-1 text-[13px] text-white">
            {dictionary.settings.plan}
          </p>
          <h2 className="mb-12 text-left text-3xl font-bold tracking-normal text-white">
            Premium
          </h2>
          <div className="text-sm grid grid-cols-2 gap-4 text-white">
            <div>{dictionary.settings.member}</div>
            <div className="flex justify-end">
              {getSubscriptionDate(subscription.created)}
            </div>
            <div>{dictionary.settings.trial}</div>
            <div className="flex justify-end">
              {getSubscriptionDate(subscription.current_period_end)}
            </div>
            <div>{dictionary.settings.period}</div>
            <div className="flex justify-end">
              {getSubscriptionDate(subscription.current_period_end)}
            </div>
            <div>{dictionary.settings.billing}</div>
            <div className="flex justify-end">
              {" "}
              {getSubscriptionDate(subscription.billing_cycle_anchor)}
            </div>
            <div>{dictionary.settings.paymentAmoun}</div>
            <div className="flex justify-end">
              {formattedNumber} USD /{" "}
              <span className="ml-1 capitalize">
                {subscription.plan.interval}
              </span>
            </div>
          </div>
          {interval !== "year" && (
            <div className="relative my-8 flex w-full flex-grow justify-start rounded-lg bg-gradient-to-r from-purple-400 to-purple-500/90 p-2 text-white">
              <div className="mr-2 h-8 w-8 rounded-lg bg-gradient-to-t from-[#6530FC] to-[#A486FF]">
                <span className="absolute top-4">
                  <span className="absolute top-1 ml-2 inline-flex sm:top-0">
                    <span className="absolute top-0 sm:relative sm:top-0">
                      <span className="absolute -top-2 right-[2px] text-[10px] text-white">
                        ✦
                      </span>
                      <span className="text-[12px] text-white">✦</span>
                      <span className="absolute bottom-2 left-2 text-[16px] text-white">
                        ✦
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              <span className="pt-1 text-right text-white">
                {dictionary.settings.unlock}
              </span>
            </div>
          )}
          <ManageSubscription
            subId={subId}
            interval={interval}
            translations={dictionary?.dashboard?.modal?.cancelModal}
            cancel={dictionary.settings.cancel}
            anual={dictionary.settings.switch}
          />
        </div>
        <div className="mt-12 w-2/3 rounded-lg bg-purple-700 p-8">
          <h2 className="mb-12 text-left text-3xl font-bold leading-tight tracking-normal text-white">
            {dictionary.settings.payment}
          </h2>
          <div className="text-sm grid grid-cols-2 gap-4 text-white">
            <div className="pt-2">{dictionary.settings.manage}</div>
            <Link
              target="_blank"
              href={paymentPortalLink}
              className="flex justify-end"
            >
              <span className="flex h-auto w-auto justify-center rounded-lg bg-purple-500 p-2 text-center">
                <ArrowUpRight />
              </span>
            </Link>
            <div className="pt-2">{dictionary.settings.history}</div>
            <Link
              target="_blank"
              href={paymentPortalLink}
              className="flex justify-end"
            >
              <span className="flex h-auto w-auto justify-center rounded-lg bg-purple-500 p-2 text-center">
                <ArrowUpRight />
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
