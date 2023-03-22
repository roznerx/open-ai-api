import { NextResponse, NextRequest } from "next/server"

import { PREMIUM_SUBSCRIPTION_AMOUNT } from "@/lib/constants"

// This is your test  API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
console.log("stripeSecret:", process.env.STRIPE_SECRET_KEY)

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return PREMIUM_SUBSCRIPTION_AMOUNT
}

export async function POST(req: NextRequest) {
  //   const { items } = req.body
  console.log("req.body:", req.body)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount([]),
    currency: "usd",
    payment_method: {
      card: {
        brand: "visa",
      },
    },
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return NextResponse.json({
    clientSecret: paymentIntent,
  })
}

export async function GET() {
  return new Response("Hello World")
}
