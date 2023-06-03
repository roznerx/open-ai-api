import compileMjml from "mjml"

export default async function handler(req, res) {
  const query = req.query
  const { name, credits } = query

  const html = compileMjml(
    `<mjml>
    <mj-body background-color="#101018">
      <mj-section>
        <mj-column>
          <mj-image width="248px" height="40px" src="https://www.code-genius.dev//email/logo-genius-code.png"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text font-style="normal" font-size="24px" font-weight="bold" font-family="Helvetica Neue" color="#FFF">Thanks for your purchase!</mj-text>
          <mj-text font-style="normal" font-size="18px" font-weight="normal" font-family="Helvetica Neue" color="#FFF" line-height="1.5"> ${name},</mj-text>
  <!--        <mj-text font-style="normal" font-size="18px" font-weight="normal" font-family="Helvetica Neue" color="#FFF" line-height="1.5"> 
            We’re so glad you’re here! Thanks for joining us. </mj-text>-->
          <mj-text font-style="normal" font-size="18px" font-family="Helvetica Neue" color="#A9A8B0" line-height="1.5">
            You have now ${credits} credits available in your account, to use however you want! Feel free to explore the following Code Genius features.</mj-text>
          <mj-divider border-width="1px" border-color="#292B45"></mj-divider>
        </mj-column>
      </mj-section>
      
      <mj-section>
        <mj-column padding="0px 0px 0px 5px">
          <mj-text font-style="bold" font-size="20px" font-weight="bold" font-family="Helvetica Neue" color="#FFF" line-height="1"> 💡 Code Idea</mj-text>
        </mj-column>
      </mj-section>
      
      <mj-section>
        <mj-column>
          <mj-text font-style="normal" font-size="18px" font-family="Helvetica Neue" color="#A9A8B0" line-height="1.5">If you need to generate tests for your code, improve the performance, document it or you simply want to get suggestions for a code idea, this is feature you are looking for.</mj-text>
          <mj-button href="http://www.code-genius.dev/code-idea" background-color="#A1FFE0" color="#1D1D29" align="left" border-radius="10px" font-family="helvetica" font-weight="bold" font-size="18px">Go to code Idea</mj-button>
        </mj-column>
        <mj-column>
          <mj-image width="200px" src="https://www.code-genius.dev/email/code-idea.png"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-divider border-width="1px" border-color="#292B45"></mj-divider>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column padding="0px 0px 0px 5px">
        <mj-text font-style="bold" font-size="20px" font-weight="bold" font-family="Helvetica Neue" color="#FFF" line-height="1" > 💬 Chat</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text font-style="normal" font-size="18px" font-family="Helvetica Neue" color="#A9A8B0" line-height="1.5">Explore the Chat page and get the answers you are looking for, chat with Coge Genius.</mj-text>
          <mj-button href="http://www.code-genius.dev/code-chat" background-color="#A1FFE0" color="#1D1D29" align="left" border-radius="10px" font-family="helvetica" font-weight="bold" font-size="18px">Go to Chat</mj-button>
        </mj-column>
        <mj-column>
          <mj-image width="190px" src="https://www.code-genius.dev/email/chat-idea.png"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-divider border-width="1px" border-color="#292B45"></mj-divider>
        </mj-column>
      </mj-section>
      <mj-section>
         <mj-column width="100%">
            <mj-text font-style="normal" font-size="18px" font-family="Helvetica Neue" color="#FFF" line-height="1.5">
            Have fun coding and exploring new ideas! <div></div>
            – Genius Code Team
          </mj-text>
        </mj-column>
         </mj-section>
         <mj-section>
         <mj-column width="100%">
           <mj-text color="#FFF" font-size="18px" font-family="Helvetica Neue" font-weight="bold" line-height="1.5" align="center" >
              We would love to see what you’re building with Genius Code! Please tag us and follow us!
            </mj-text>
            <mj-social font-size="15px" icon-size="30px" mode="horizontal" padding="0" align="center">
              <mj-social-element name="youtube" href="https://www.youtube.com/channel/UCpse6cfLu3KmQwEXfLpWaXQ" background-color="#A1A0A0">
              </mj-social-element>
              <mj-social-element name="twitter" href="https://twitter.com/CodeGeniusDev" background-color="#A1A0A0">
              </mj-social-element>
              <mj-social-element name="linkedin" href="https://www.linkedin.com/company/93388566" background-color="#A1A0A0">
              </mj-social-element>
            </mj-social>
        </mj-column>
      </mj-section>
  
    </mj-body>
  </mjml>`,
  )
  return res.status(200).send(html)
}
