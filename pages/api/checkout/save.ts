import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  //   const bodyRequest = JSON.parse(req.body)
  const {
    email,
    userId,
    name,
    confirmed,
    checkoutURL,
    amount,
    created,
    credits,
  } = req.body

  const payload = {
    userId,
    email,
    name,
    confirmed,
    checkoutURL,
    created,
    credits,
    amount,
  }
  if (req.method === "POST") {
    try {
      const response = await harperClient({
        operation: "insert",
        schema: "Auth",
        table: "CheckoutSessions",
        records: [payload],
      })

      console.log("::DB response::", response)

      res.status(200).json({ response })
    } catch (error) {
      res.status(500).json({ message: "There was an error with your request" })
    }
  }
}
