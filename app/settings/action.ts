"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { updateUserSubscription } from "utils/helpers"

export async function cancelAction(subId, userId) {
  try {
    await stripe.subscriptions.update(subId, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "Customer deleted their Code Genius subscription.",
      },
    })

    await updateUserSubscription(userId, "")
  } catch (error) {
    console.error(`The was an error deleting your subscription: ${error}`)
  }

  redirect("/dashboard?action=subscription-deleted")
}
