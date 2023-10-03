import { getDictionary } from "app/(lang)/dictionaries"
import SideBar from "app/components/shared/SideBar"
import { headers } from "next/headers"
import Client from "./client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { stripe } from "@/lib/stripe"
import { Params } from "app/settings/page"
import { updateUserSubscription } from "utils/helpers"

export const metadata = {
  title: "AI Dashboard",
}

// interface SearchParamsDashboard extends Params {
//   action: string
// }
export const dynamic = "force-dynamic"

interface SearchParamsWithSesId extends Params {
  session_id: string
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParamsWithSesId
}) {
  const { session_id } = searchParams
  const session = await getServerSession(authOptions)
  let stripeSession
  if (!session) {
    redirect("/?referer=/dashboard")
  }
  if (session_id) {
    stripeSession = await stripe.checkout.sessions.retrieve(session_id)
  }
  // We set the subscription ID in the webhook, this code ensures we store the subscription id in the DB.
  if (stripeSession) {
    await updateUserSubscription(session.user.id, stripeSession.subscription)
  }

  const headersList = headers()
  const lang =
    headersList &&
    headersList?.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  // const stripeData = await stripe.subscriptions.retrieve(
  //   "sub_1NXYSVKrxiA7kR6cFwedIMNp",
  // )
  // console.log("stripe subscription data: ", stripeData.items.data)

  return (
    <div className="flex bg-purple-900">
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <div className="mx-auto w-full dark:bg-purple-900">
        <Client
          translations={dictionary}
          headerTranslations={dictionary.home.header}
        />
      </div>
    </div>
  )
}
