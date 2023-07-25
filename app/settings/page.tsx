import { stripe } from "@/lib/stripe"
import { getDictionary } from "app/(lang)/dictionaries"
import { Card, Title, Flex } from "@tremor/react"
import SideBar from "app/components/shared/SideBar"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { updateUserSubscription } from "utils/helpers"

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
  console.log("session:", session)
  if (!session) {
    redirect("/?action=signUp&next=/settings")
  }

  const headersList = headers()
  const lang =
    headersList &&
    headersList?.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <div className="mx-auto flex w-full items-center justify-center text-white dark:bg-purple-900">
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <form action={deleteSubscription}>
        <Card>
          <Title>Manage Subscription</Title>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="space-x-2"
          >
            <button type="submit" className="text-black">
              Delete Subscription
            </button>
          </Flex>

          {/* <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
              }
              className="mt-2"
            /> */}
        </Card>
      </form>
    </div>
  )
}
