import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "node:stream"

import Stripe from "stripe"

import { stripe } from "lib/stripe"

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
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST

    let subscription
    let status
    let event: Stripe.Event
    try {
      if (!sig || !webhookSecret) return
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (relevantEvents.has(event.type)) {
      try {
        if (event.type === "checkout.session.completed") {
          subscription = event.data.object as Stripe.Checkout.Session
          console.log("subscription:", subscription)
          status = subscription.status
          console.log("status:", status)

          // if (
          //   checkoutSession.client_reference_id === null ||
          //   checkoutSession.customer === null
          // ) {
          //   console.log({
          //     message: "Missing items in Stripe webhook callback",
          //   })
          //   return
          // }

          // for subscription updates
        } else if (event.type === "customer.subscription.deleted") {
          const subscriptionDeleted = event.data.object as Stripe.Subscription

          const stripeId = subscriptionDeleted.customer.toString()
          console.log("subscription deleted::stripeId:", stripeId)
        } else {
          throw new Error("Unhandled relevant event!")
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
