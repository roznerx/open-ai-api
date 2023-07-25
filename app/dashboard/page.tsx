import { getDictionary } from "app/(lang)/dictionaries"
import SideBar from "app/components/shared/SideBar"
import { headers } from "next/headers"
import Client from "./client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"

export const metadata = {
  title: "AI Dashboard",
}

// interface SearchParamsDashboard extends Params {
//   action: string
// }
export const dynamic = "force-dynamic"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/?referer=/dashboard")
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
    <div className="flex">
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
