import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  //   const bodyRequest = JSON.parse(req.body)
  const { email, userId, name, confirmed, checkoutURL, amount, created } =
    req.body

  const payload = {
    userId,
    email,
    name,
    confirmed,
    checkoutURL,
    created,

    amount,
  }
  if (req.method === "POST") {
    try {
      const response = await prisma.checkoutSessions.create({
        data: {
          ...payload,
        },
      })

      console.log("::DB response::", response)

      res.status(200).json({ response })
    } catch (error) {
      console.log("error:", error)
      res
        .status(500)
        .json({ message: "There was an error with your request", error: error })
    }
  }
}
