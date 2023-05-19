import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  // console.log("req::", req.body)

  if (req.method === "POST") {
    const checkoutSession = await harperClient({
      operation: "sql",
      //@ts-ignore
      sql: `SELECT * FROM Auth.CheckoutSessions WHERE userId = "${req.body.userId}" AND credits > 0 ORDER BY __createdtime__ DESC LIMIT 1`,
    })

    res.status(200).json({ session: checkoutSession[0] })
  }
}
