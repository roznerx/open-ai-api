/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
export const DUB_LOGO =
  "https://public.blob.vercel-storage.com/kmKY9FhOzDRAX28c/logo-1Y8NV0x4Wsy7LzPAYjBmkytJYTMJi0.png"
export const DUB_THUMBNAIL =
  "https://public.blob.vercel-storage.com/kmKY9FhOzDRAX28c/thumbnail-wU82A4LTeJMXrygW1ZR6O36k3edeJf.png"

export default function WelcomeEmail({
  name = "[Name]",
}: {
  name: string | null
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Code Genius</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_LOGO}
                width="40"
                height="40"
                alt="Code Genius"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="text-xl mx-0 my-7 p-0 text-center font-semibold text-black">
              Welcome to Code Genius
            </Heading>
            <Section className="my-8">
              <Img
                src={DUB_THUMBNAIL}
                alt="Code Genius"
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Thanks for signing up{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is Steven, and I'm the founder of Code Genius - the link
              management tool for modern marketing teams. I'm excited to have
              you on board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here are a few things you can do:
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              ◆ Create a{" "}
              <Link
                href="https://app.Code Genius.sh/links"
                className="text-blue-600 font-medium no-underline"
              >
                Code Genius.sh short link
              </Link>
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              ◆ Create a{" "}
              <Link
                href="https://app.Code Genius.sh"
                className="text-blue-600 font-medium no-underline"
              >
                new project
              </Link>{" "}
              and add your custom domain
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              ◆ Follow us on{" "}
              <Link
                href="https://twitter.com/dubdotsh"
                className="text-blue-600 font-medium no-underline"
              >
                Twitter
              </Link>
            </Text>
            <Text className="text-sm leading-6 text-black">
              Let me know if you have any questions or feedback. I'm always
              happy to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Steven from Code Genius
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
