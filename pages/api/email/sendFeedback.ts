import EmailTemplate from "app/components/shared/feedback-email-template"
import type { NextApiRequest, NextApiResponse } from "next"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const bodyRequest = JSON.parse(req.body)
  if (!bodyRequest) {
    return res.status(400).json({ done: false })
  }
  try {
    const data = await resend.sendEmail({
      from: "delivered@resend.dev",
      to: "geniuscodeai@gmail.com",
      subject: `New client feedback from: ${bodyRequest.name}`,
      react: EmailTemplate({
        name: bodyRequest.name,
        message: bodyRequest.message,
      }),
    })

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
}
