import * as React from "react"

interface EmailTemplateProps {
  name: string
  message: string
}

export const EmailTemplate = ({ name, message }: EmailTemplateProps) => (
  <div>
    <h1>New customer feedback from, {name}!</h1>
    <p>Message:</p>
    <span>{message}</span>
  </div>
)

export default EmailTemplate
