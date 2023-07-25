import { stripe } from "@/lib/stripe"
import { getDictionary } from "app/(lang)/dictionaries"
import SideBar from "app/components/shared/SideBar"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"

export const metadata = {
  title: "AI Dashboard",
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  console.log("session:", session)
  if (!session) {
    redirect("/?next=/settings")
  }

  const headersList = headers()
  const lang =
    headersList &&
    headersList?.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)
  const subscriptionId = session?.user?.subscriptionId || ""
  const stripeData = await stripe.subscriptions.retrieve(subscriptionId)
  console.log("stripeData:", stripeData.items.data)

  return (
    <div className="flex">
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <div className="mx-auto w-full dark:bg-purple-900">
        <h1>Hello {}</h1>
      </div>
    </div>
  )
}
