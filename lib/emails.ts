export async function sendMarketingEmail(payload) {
  try {
    await fetch(`/api/email/send`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error("error sending welcome email: ", error)
  }
}
