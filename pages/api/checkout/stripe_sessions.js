const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// function getCurrentUnixTimestamp() {
//   return Math.floor(Date.now() / 1000)
// }

// // Get the Unix timestamp for 7 days from now
// function getUnixTimestampAfter7Days() {
//   // Get the current timestamp
//   let currentTimestamp = getCurrentUnixTimestamp()

//   // Calculate the timestamp for 7 days (in seconds)
//   let sevenDaysInSeconds = 7 * 24 * 60 * 60

//   // Add 7 days to the current timestamp
//   let timestampAfter7Days = currentTimestamp + sevenDaysInSeconds

//   return timestampAfter7Days
// }

export default async function handler(req, res) {
  // TrialPeriodEnd is the timestamp for 7 days in the future.
  // const currentDate = new Date()
  // const trialPeriodEndInOneDay = currentDate.setDate(currentDate.getDate() + 6)
  // const testClock = await stripe.testHelpers.testClocks.create({
  //   frozen_time: getUnixTimestampAfter7Days(),
  // })
  // console.log("testClock:", testClock)
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
        client_reference_id: req.body.userId,
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/dashboard?success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        metadata: {
          user_id: req.body.userId,
        },
        subscription_data: {
          trial_period_days: 7,
          metadata: {
            user_id: req.body.userId,
          },
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
