import { sendWelcomeEmail } from "utils/sendEmail"
const server = process.env.EMAIL_SERVER
const from = process.env.EMAIL_FROM

export default async function handler(req, res) {
  const bodyRequest = JSON.parse(req.body)
  if (!bodyRequest) {
    return res.status(400).json({ done: false })
  }
  try {
    await sendWelcomeEmail({
      isNewPuchase: bodyRequest?.isNewPuchase,
      credits: bodyRequest?.credits,
      html: bodyRequest?.html,
      name: bodyRequest?.name,
      identifier: bodyRequest.contactEmail,
      message: bodyRequest.message,
      provider: { server, from },
    })
    return res.status(200).json({ done: true })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ done: false })
  }
}
