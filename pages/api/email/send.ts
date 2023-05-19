import { sendInfoEmailFromClient } from "utils/sendEmail"

export default async function handler(req, res) {
  const bodyRequest = JSON.parse(req.body)
  if (!bodyRequest) {
    return res.status(400).json({ done: false })
  }
  try {
    await sendInfoEmailFromClient({
      isNewPuchase: bodyRequest?.isNewPuchase,
      credits: bodyRequest?.credits,
      name: bodyRequest.name,
      contactEmail: bodyRequest.contactEmail,
      message: bodyRequest.message,
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ done: false })
  }

  return res.status(200).json({ done: true })
}
