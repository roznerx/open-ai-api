import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "node:stream"

import Stripe from "stripe"

import { stripe } from "lib/stripe"
import { updateUserSubscription } from "utils/helpers"

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks: Buffer[] = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])
// POST /api/stripe/webhook – listen to Stripe webhooks
export default async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // POST /api/stripe/webhook – listen to Stripe webhooks
  if (req.method === "POST") {
    const rawBody = await buffer(req)

    const sig = req.headers["stripe-signature"]

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let subscription
    let event: Stripe.Event
    try {
      if (!sig || !webhookSecret) return
      console.log("sig:", sig)
      console.log("webhookSecret:", webhookSecret)
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
      console.log("event:", event)
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (relevantEvents.has(event.type)) {
      try {
        if (event.type === "checkout.session.completed") {
          subscription = event.data.object as Stripe.Checkout.Session
          console.log("subscription:", subscription)
          // status = subscription.status
          // console.log("status:", status)
          console.log("customer subscription:", subscription.customer)
          //Update the user
          if (subscription.status === "complete") {
            const userId = subscription?.metadata?.user_id
            const subscriptionId = subscription?.subscription
            console.log("subscriptionId:", subscriptionId)

            await updateUserSubscription(userId, subscriptionId)

            // return res.status(200).json({ ok: true })
          }

          //Send EMAIL to CLIENT

          // for subscription updates
        } else {
          return res.status(200).json({ ok: false })
        }
      } catch (error) {
        return res
          .status(400)
          .send('Webhook error: "Webhook handler failed. View logs."')
      }
    } else {
      return res.status(400).send(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }
  }
}
