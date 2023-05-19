import compileMjml from "mjml"

export default async function handler(req, res) {
  const {
    user: { name },
  } = req.body
  console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL)

  const html = compileMjml(
    `<mjml>
  <mj-body background-color="#101018">
    <mj-section>
      <mj-column>
        <mj-image width="248px" height="40px" src="${process.env.NEXTAUTH_URL}/email/logo-genius-code.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-style="normal" font-size="24px" font-weight="bold" font-family="Helvetica Neue" color="#FFF">Welcome to Code Genius!</mj-text>
        <mj-text font-style="normal" font-size="18px" font-weight="normal" font-family="Helvetica Neue" color="#FFF" line-height="1.5"> 👋 Hey ${name}!</mj-text>
        <mj-text font-style="normal" font-size="18px" font-weight="normal" font-family="Helvetica Neue" color="#FFF" line-height="1.5">
          We’re so glad you’re here! Thanks for joining us. </mj-text>
        <mj-text font-style="normal" font-size="18px" font-weight="" font-family="Helvetica Neue" color="#FFF" line-height="1.5">
          Now you have 25 credits available to use however you want!Whether you’re learning how to code, or you already have been doing it for a while we think our features will help you on your code journey.</mj-text>
        <mj-text font-style="normal" font-size="18px" font-weight="" font-family="Helvetica Neue" color="#FFF" line-height="1.5">
          Have fun! <div></div>
          – Genius Code Team
        </mj-text>
        <mj-divider border-width="1px" border-color="#292B45"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-style="bold" font-size="20px" font-weight="bold" font-family="Helvetica Neue" color="#FFF" line-height="1">💡 Code Idea</mj-text>
        <mj-text font-style="normal" font-size="18px" font-weight="normal" font-family="Helvetica Neue" color="#FFF" line-height="1.5">
        If you need to improve a function, document code, 
        test code or you simply want to get suggestions for a code idea, then this is the feature you are looking for.</mj-text>
        <mj-button href="${process.env.NEXTAUTH_URL}/code-idea" background-color="#A1FFE0" color="#1D1D29" align="left" border-radius="10px" font-family="helvetica" font-weight="bold" font-size="18px">Go to code Idea</mj-button>
      </mj-column>
      <mj-column>
        <mj-text height="40px"></mj-text>
        <mj-image width="248px" height="138px" src="${process.env.NEXTAUTH_URL}/email/code-idea.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-divider border-width="0.5px" border-color="#292B45"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-style="bold" font-size="20px" font-weight="bold" font-family="Helvetica Neue" color="#FFF" line-height="1"> 💬 Chat with Code Genius</mj-text>
        <mj-text font-style="normal" font-size="18px" font-weight="normal" font-family="Helvetica Neue" color="#FFF" line-height="1.5">
        Need some inspiration? Go to Code Genius and get the answers you are looking for.</mj-text>
        <mj-button href="${process.env.NEXTAUTH_URL}/code-chat" background-color="#A1FFE0" color="#1D1D29" align="left" border-radius="10px" font-family="helvetica" font-weight="bold" font-size="18px">Go to Chat</mj-button>
      </mj-column>
      <mj-column>
        <mj-image width="248px" height="138px" src="${process.env.NEXTAUTH_URL}/email/code-idea.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-divider border-width="1px" border-color="#292B45"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section>
       <mj-column width="100%">
         <mj-text color="#FFF" font-size="18px" font-family="Helvetica Neue" font-weight="bold" line-height="1.5" align="center" >
            We would love to see what you’re building with Genius Code! Please tag us and follow us!
          </mj-text>
          <mj-social font-size="15px" icon-size="30px" mode="horizontal" padding="0" align="center">
            <mj-social-element name="youtube" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
            <mj-social-element name="twitter" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
            <mj-social-element name="linkedin" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
          </mj-social>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
  )
  return res.send(html)
}
