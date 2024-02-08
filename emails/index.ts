import { customAlphabet } from "nanoid"
import { ReactElement, JSXElementConstructor } from "react"
import { Resend } from "resend"

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
)

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export const sendEmail = async ({
  email,
  subject,
  react,
  test,
}: {
  email: string
  subject: string
  react: ReactElement<any, string | JSXElementConstructor<any>>
  test?: boolean
}) => {
  if (!resend) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.",
    )
    return Promise.resolve()
  }

  const data = await resend.emails.send({
    from: "Code Genius Team <welcome@code-genius.dev>",
    to: test ? "delivered@resend.dev" : email,
    subject,
    react,
  })
  console.log("data:", data)
}
