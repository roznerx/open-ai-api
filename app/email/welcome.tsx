import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"
import { RowWithImage } from "./components"

interface WelcomeEmailProps {
  username?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `${process.env.NEXTAUTH_URL}`

export const WelcomeEmail = ({ username = "Lautaro" }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section className="mx-auto my-12 inline-flex items-center justify-center">
              <Img
                src={`${baseUrl}/email/logo-genius-code.png`}
                width={248}
                height={40}
                alt="Code Genius"
              />
            </Section>

            <Section style={{ paddingBottom: "20px" }}>
              <Row>
                <Text style={heading}>Welcome to Code Genius</Text>
                <Section style={{ marginTop: 20 }}>
                  <Text style={paragraph}>👋🏻 Hey {username}</Text>
                </Section>

                {/* <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                
                </Text> */}
                <Text
                  style={{
                    ...paragraph,
                    marginTop: "16px",
                    paddingBottom: "16px",
                  }}
                >
                  We’re so glad you’re here! Thanks for joining us. <br /> Now
                  you have 25 credits available to use however you want!
                  <br />
                  Whether you’re learning how to code, or you already have been
                  doing it for a while we think our features will help you on
                  your code journey .
                </Text>
                <Text
                  style={{
                    ...paragraph,
                    marginTop: "16px",
                    paddingBottom: "16px",
                  }}
                >
                  Have fun!
                </Text>
                <Text
                  style={{
                    ...paragraph,
                    marginTop: "4px",
                    paddingBottom: "4px",
                  }}
                >
                  – Genius Code Team
                </Text>
              </Row>
            </Section>

            <Hr style={hr} />

            <Section
              style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
            >
              <Row>
                <Column>
                  <RowWithImage
                    title="💡 Code Idea"
                    buttonText="Go to code your idea"
                    buttonLink={`${baseUrl}/code-idea`}
                    text="If you need to improve a function, document code, test code or you simply want to get suggestions for a code idea, then this is feature you are looking for."
                    imageUrl={`${baseUrl}/email/code-idea.png`}
                  />
                </Column>
              </Row>
            </Section>
            <Hr style={hr} />
            <Section
              style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
            >
              <Row>
                <Column>
                  <RowWithImage
                    title="💬 Chat with Code Genius"
                    buttonText="Chat with Code Genius"
                    buttonLink={`${baseUrl}/code-chat`}
                    text="Need some inspiration? Go to Genius Code and start the conversation. We promise, you will get the answers you are looking for."
                    imageUrl={`${baseUrl}/email/chat-idea.png`}
                  />
                </Column>
              </Row>
            </Section>
            <Hr style={hr} />
            <Section>
              <Text style={footerText}>
                We would love to see what you’re building with Genius Code!
                <br />
                Please tag us & follow us!
              </Text>
              <Row>
                <Column
                  align="right"
                  style={{ width: "50%", paddingRight: "8px" }}
                >
                  <Link href="https://www.youtube.com/channel/UCpse6cfLu3KmQwEXfLpWaXQ">
                    <Img
                      width={41}
                      height={41}
                      src={`${baseUrl}/icons/youtube.png`}
                    />
                  </Link>
                </Column>
                <Column
                  align="left"
                  style={{ width: "50%", paddingLeft: "8px" }}
                >
                  <Link href="https://www.linkedin.com/company/93388566">
                    <Img
                      width={41}
                      height={41}
                      src={`${baseUrl}/icons/linkedin.png`}
                    />
                  </Link>
                </Column>
              </Row>
              <Hr style={hr} />
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

const main = {
  backgroundColor: "#101018",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
}
const footerText: React.CSSProperties = {
  margin: "40px auto",
  color: "#fff",
  fontSize: "16px",
  textAlign: "center",
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#fff",
}

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#fff",
}

const hr = {
  borderColor: "#292B45",
  margin: "20px 10px",
}

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
}
