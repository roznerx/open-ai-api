import { stripe } from "@/lib/stripe"
import { getDictionary } from "app/(lang)/dictionaries"

import SideBar from "app/components/shared/SideBar"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { updateUserSubscription } from "utils/helpers"
import { Card, Metric, Text, Title, Flex, Grid } from "@tremor/react"
import Chart from "./chart"

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
  const subscription = await stripe.subscriptions.retrieve(subId)
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
  const lang =
    headersList &&
    headersList?.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <>
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <main className="mx-auto flex w-full flex-col justify-center p-4 sm:max-w-7xl md:p-10">
        <Grid numItemsSm={2} numItemsLg={3} className="mt-20 gap-6 sm:mt-0">
          <Card>
            <Title>Premium Subscription</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>7</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Delete</Text>
              <form action={deleteSubscription}>
                <Card>
                  <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="space-x-2"
                  >
                    <button type="submit" className="text-black">
                      Delete Subscription
                    </button>
                  </Flex>
                </Card>
              </form>
            </Flex>
            {/* <BarList
              data={items[0].data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
              }
              className="mt-2"
            /> */}
          </Card>
          <Card>
            <Flex className="space-x-2">
              <Title>Member since: </Title>
              <Text>{getSubscriptionDate(subscription.created)}</Text>
            </Flex>
            <Flex className="mt-6 space-x-2">
              <Title>Trial ends in: </Title>
              <Text>{getSubscriptionDate(subscription.trial_end)}</Text>
            </Flex>
          </Card>
          <Card>
            <Flex className="space-x-2">
              <Title>Billing Cycle start:</Title>
              <Text>
                {getSubscriptionDate(subscription.billing_cycle_anchor)}
              </Text>
            </Flex>
            <Flex className="mt-6 space-x-2">
              <Title>Billing Frequency: </Title>
              <Text>Monthly</Text>
            </Flex>
            <Flex className="mt-6 space-x-2">
              <Title>Currency: </Title>
              <Text className="uppercase">{subscription.currency}</Text>
            </Flex>
          </Card>
        </Grid>
        <Chart />
      </main>
    </>
  )
}
