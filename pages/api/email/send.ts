import WelcomeEmail from "emails/welcome-email"
import type { NextApiRequest, NextApiResponse } from "next"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
console.log("resend:", resend)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const bodyRequest = JSON.parse(req.body)
  if (!bodyRequest) {
    return res.status(400).json({ done: false })
  }

  const subject = bodyRequest?.isNewUser
    ? `Welcome to Code Genius ${bodyRequest.name}! 🎉`
    : `Code Genius </> ${bodyRequest.name}`
  try {
    const data = await resend.sendEmail({
      from: "delivered@resend.dev",
      to: bodyRequest.email,
      subject: subject,
      react: WelcomeEmail({ name: bodyRequest.name }),
    })

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
}

// export default async function handler(req, res) {
//   const bodyRequest = JSON.parse(req.body)
//   if (!bodyRequest) {
//     return res.status(400).json({ done: false })
//   }
//   try {
//     await sendWelcomeEmail({
//       isNewPuchase: bodyRequest?.isNewPuchase,
//       credits: bodyRequest?.credits,
//       html: bodyRequest?.html,
//       name: bodyRequest?.name,
//       identifier: bodyRequest.contactEmail,
//       message: bodyRequest.message,
//       provider: { server, from },
//     })
//     return res.status(200).json({ done: true })
//   } catch (error) {
//     console.error(error)
//     return res.status(400).json({ done: false })
//   }
// }
