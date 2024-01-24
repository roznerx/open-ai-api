import WelcomeEmail from "emails/welcome-email"
import type { NextApiRequest, NextApiResponse } from "next"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const bodyRequest = JSON.parse(req.body)
  console.log("bodyRequest:", bodyRequest)
  if (!bodyRequest) {
    return res.status(400).json({ done: false })
  }

  const subject = bodyRequest?.isNewUser
    ? `Welcome to Code Genius ${bodyRequest.name}! 🎉`
    : `Code Genius </> ${bodyRequest.name}`
  try {
    const data = await resend.emails.send({
      from: "delivered@resend.dev",
      to: bodyRequest.email,

      subject: subject,
      react: WelcomeEmail({ name: bodyRequest.name }),
    })

    res.status(200).send(data)
  } catch (error) {
    console.error("Error: ", error)
    res.status(400).json(error)
  }
}
