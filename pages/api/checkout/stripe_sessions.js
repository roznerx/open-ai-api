const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  console.log("req.headers.origin", req.headers.origin)
  console.log("req.body.credits", req.body.credits)
  console.log("stripe", stripe)

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
        mode: "payment",
        success_url: `${req.headers.origin}/dashboard?success=true&credits=${req.body.credits}`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
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
