"use client"

// import Image from "next/image";
// import Link from "next/link";
import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "app/payment/CheckoutForm"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
const stripePromise = loadStripe(stripePublishableKey)

//read stripe env key
const clientSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || ""

console.log("publicRuntimeConfig:", stripePublishableKey)
console.log("clientSecret:", clientSecret)

export default function Subscription() {
  const appearance = {
    theme: "stripe",
  }
  const options: any = {
    clientSecret,
    appearance,
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
