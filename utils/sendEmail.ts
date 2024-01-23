import { createTransport } from "nodemailer"

const from = process?.env?.EMAIL_FROM
const server = process?.env?.EMAIL_SERVER

export async function sendWelcomeEmail(params) {
  const {
    emailTo,
    subject,
    url = "http://localhost:3000",
    provider,
    name,
    html,
  } = params
  const { host } = new URL(url)
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: emailTo,
    from: provider.from,
    subject: subject,
    html,
    text: text({ url, host }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

export async function sendInfoEmailFromClient(params) {
  const { name, contactEmail, message, isNewPuchase, credits } = params

  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(server)
  const result = await transport.sendMail({
    to: isNewPuchase ? contactEmail : "geniuscodeai@gmail.com",
    subject: isNewPuchase
      ? `🧞‍♂️ Thanks for your purchase ${name}`
      : `New Client Contact`,
    from,
    text: textInfo({ name, contactEmail, message }),
    html: htmlFromClients({ name, contactEmail, message, isNewPuchase }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string; userName: string }) {
  const { url, host, userName } = params

  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Welcome to Code Genius <strong>${userName}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

function textInfo({
  name,
  contactEmail,
  message,
}: {
  name: string
  contactEmail: string
  message: string
}) {
  return `New contact email from ${name}\n
  The contact email is ${contactEmail}\n\n
  The message is ${message}\n\n`
}

function htmlFromClients(params: {
  name: string
  contactEmail: string
  message: string
  isNewPuchase: boolean
}) {
  const { name, contactEmail, message, isNewPuchase = false } = params

  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${
      color.mainBackground
    }; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
          color.text
        };">
          ${
            isNewPuchase
              ? `Thank you, <strong>${name}</strong>`
              : `New client contact: Mr/Miss <strong>${name}</strong>`
          }
          ${isNewPuchase ? message : `The contact email is: ${contactEmail}`}
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
          color.text
        };">
        ${
          !isNewPuchase
            ? `The message of the potential client is: ${message}`
            : ""
        }
      </td>
    </tr>
  </table>
</body>
`
}

export async function SendCongratsEmail(session, credits) {
  const userName = session?.user?.name
  const userEmail = session?.user?.email
  const fetchUrl = `${
    process.env.NEXTAUTH_URL
  }/api/email/generate-credits-html?name=${userName}&credits=${credits}&ts${new Date().getTime()}`

  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(fetchUrl, {
    method: "GET",
    headers: headers,
  })
  const { html } = await response.json()
  console.log("The HTML is: ", html)
  //Send congrats email to the user
  // const payload = {
  //   name: userName,
  //   credits,
  //   html,
  //   isNewPuchase: true,
  //   contactEmail: userEmail,
  // }

  // await fetch(`${process.env.NEXTAUTH_URL}/api/email/send`, {
  //   method: "POST",
  //   body: JSON.stringify(payload),
  // })
}
