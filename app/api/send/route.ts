import WelcomeEmail from "emails/welcome-email"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json()

  try {
    const { data } = await resend.emails.send({
      from: "welcome@code-genius.dev",
      to: bodyRequest.email,
      subject: bodyRequest.isNewUser
        ? "Welcome to Code Genius"
        : bodyRequest.subjet,
      react: WelcomeEmail({
        name: bodyRequest.name,
      }),
      headers: {
        "X-Entity-Ref-ID": Math.random().toString(),
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
