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

// export const CODE_GENIUS_HEADER =
//   "https://www.code-genius.dev/blog/code-genius-logo.png"

export const LOGO_THUMBNAIL = "https://www.code-genius.dev/logo/code-genius.png"

export default function WelcomeEmail({ name = "" }: { name: string | null }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome {`${name}`}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Heading className="text-xl mx-0 my-7 p-0 text-center font-semibold text-black">
              Welcome {`${name}`}
            </Heading>
            <Section className="my-8">
              <Img
                src={LOGO_THUMBNAIL}
                alt="Code Genius"
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Thanks for signing up!
            </Text>
            <Text className="text-sm leading-6 text-black">
              I'm Paul, the founder of Code Genius, the handy developer tool for
              the AI era. I'm thrilled to welcome you on board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              At Code Genius, our mission is to enhance your developer
              experience and boost your efficiency, providing you with the tools
              and resources you need to succeed. Whether you're a seasoned coder
              or just starting out, we're here to support you every step of the
              way.
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here are a few things you can do right away:
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              <Text className="font-bold">◆ Chat with Code Genius: </Text>
              Start asking anything programming-related on our
              <Link
                href="https://code-genius.dev/code-chat"
                className="text-blue-600 font-medium no-underline"
              >
                {" "}
                Chat page.
              </Link>{" "}
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              <Text className="font-bold">◆ Premium Membership:</Text>
              Explore the benefits of becoming a premium member on our
              <Link
                href="https://code-genius.dev/pricing"
                className="text-blue-600 font-medium no-underline"
              >
                {" "}
                Pricing page
              </Link>{" "}
              for exclusive access to premium functionalities.
            </Text>

            <Text className="text-sm leading-6 text-black">
              Have questions or feedback? I'm here to help! Send us an email to{" "}
              <Link
                href="mailto:support@code-genius.dev"
                className="text-blue-600 font-medium no-underline"
              >
                support@code-genius.dev{" "}
              </Link>
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Happy coding,
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Paul
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
