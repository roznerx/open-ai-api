export async function sendMarketingEmail(payload) {
  try {
    await fetch(`${process.env.NEXTAUTH_URL}/api/email/send`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error("error sending welcome email: ", error)
  }
}
