const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // const currentDate = new Date()

  // TrialPeriodEnd is the timestamp for 7 days in the future.
  // const trialPeriodEnd = currentDate.setDate(currentDate.getDate() + 7)
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: req.body.priceUID,
            quantity: 1,
          },
        ],
        // set one time payment for Stripe mode checkout
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/dashboard?success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        subscription_data: {
          trial_period_days: 7,
        },
      })

      res.json({ session })
    } catch (err) {
      console.log("err:", err)
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
