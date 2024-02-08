/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

// export const CODE_GENIUS_HEADER =
//   "https://www.code-genius.dev/blog/code-genius-logo.png"

export const LOGO_THUMBNAIL = "https://www.code-genius.dev/logo/code-genius.png"

export default function WelcomePremium({ name = "" }: { name: string | null }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mx-0 my-8 flex justify-center text-center">
              <Img
                src={LOGO_THUMBNAIL}
                alt="Code Genius"
                className="text-center"
              />
            </Section>
            <Heading className="text-xl mx-0 my-7 p-0 text-left font-semibold text-black">
              Welcome to Code Genius Premium!
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Dear {`${name}`}
            </Text>
            <Text className="text-sm leading-6 text-black">
              Welcome to Code Genius Premium! We're thrilled to have you on
              board and excited to provide you with an enhanced coding
              experience. As a premium member, you now have access to an array
              of exclusive features and benefits designed to supercharge your
              programming journey.
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here's what you can expect as a premium member:
            </Text>

            <Text className="font-bold text-secondaryPurple">
              Code Optimization:{" "}
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              Unlock the power of optimized code with our advanced algorithms
              and techniques, ensuring your projects run smoother and faster.
            </Text>
            <Text className="font-bold text-secondaryPurple">
              Unit Test Generation:{" "}
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              Say goodbye to manual test writing! Our unit test generation tool
              automates the process, saving you time and effort while ensuring
              robust code quality.
            </Text>
            <Text className="font-bold text-secondaryPurple">
              Smart Suggestions:
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              Receive personalized recommendations and insights tailored to your
              coding style and preferences, helping you write cleaner, more
              efficient code.
            </Text>
            <Text className="font-bold text-secondaryPurple">
              24/7 Expert Support:
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              Need assistance with a programming challenge or have a question
              about a specific concept? Our team of Code Geniuses is here to
              help you anytime, anywhere.
            </Text>
            <Text className="font-bold text-secondaryPurple">
              Custom GitHub App:
            </Text>
            <Text className="text-sm ml-1 leading-4 text-black">
              Gain access to our exclusive GitHub App, powered by cutting-edge
              AI technology. Seamlessly generate unit tests for your React apps
              on the fly, revolutionizing your development workflow.{" "}
            </Text>
            <Text className="font-bold text-black">
              To install the app now{" "}
              <Link
                href="https://github.com/marketplace/code-genius-code-coverage"
                className="font-medium no-underline"
              >
                click here
              </Link>
            </Text>

            <Text className="text-sm leading-6 text-black">
              We're committed to providing you with the tools and support you
              need to excel in your coding endeavors. Whether you're a seasoned
              developer or just starting out, Code Genius Premium is here to
              elevate your skills and accelerate your success. If you have any
              questions or need assistance getting started, don't hesitate to
              reach out to our support team at{" "}
              <Link
                href="mailto:support@code-genius.dev"
                className="font-medium text-purple-600 no-underline"
              >
                support@code-genius.dev{" "}
              </Link>
              We're here to ensure your premium membership experience is nothing
              short of exceptional. Once again, welcome to the Code Genius
              Premium family! We can't wait to see what amazing projects you'll
              create with us.
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Happy coding,
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Code Genius team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
