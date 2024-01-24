"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export async function cancelAction(subId, userId) {
  try {
    await stripe.subscriptions.update(subId, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "Customer deleted their Code Genius subscription.",
      },
    })

    const userWithoutSubscription = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        isPremium: false,
        subscriptionId: "",
      },
    })
    console.log("userWithoutSubscription:", userWithoutSubscription)
  } catch (error) {
    console.error(`The was an error deleting your subscription: ${error}`)
  }

  redirect("/dashboard?action=subscription-deleted")
}
