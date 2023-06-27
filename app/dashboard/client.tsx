"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import React, { useEffect } from "react"
import ContactFormModal from "app/components/modals/ContactFormModal"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"
import GradientButton from "app/components/buttons/gradientButton"
import { Confetti } from "utils/confetti"
import PromptCard from "app/components/shared/PromptCard"

const UpgradeAccount = ({ text }) => (
  <Link href="/pricing">
    <GradientButton width="200px" text={text} />
  </Link>
)

const ChatButton = ({ text }) => (
  <Link href="/code-chat">
    <GradientButton width="200px" text={text} />
  </Link>
)

export default function Client({
  translations,
  session,
  credits,
  purchasedCredits,
  opConfirmation,
}) {
  const { setShowSignInModal } = useSignInModal({ translations })
  const searchParams = useSearchParams()
  const router = useRouter()
  const [thanksMessage, setThanksMessage] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)
  const { dashboard } = translations

  useEffect(() => {
    if (opConfirmation && searchParams && searchParams.has("success")) {
      //THANKS MESSAGE WITH DIALOG
      setThanksMessage(true)
      setOpenContactForm(true)

      //SEND CONFETI
      Confetti()
    }
  }, [opConfirmation, searchParams])

  //@ts-ignore
  const clientName = session && session?.user && session?.user?.name
  return (
    <>
      <ContactFormModal
        purchasedCredits={purchasedCredits}
        thanksMessage={thanksMessage}
        clientName={clientName}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <Header session={session} setShowSignInModal={setShowSignInModal} />
      <div className="flex w-screen items-center justify-center dark:bg-purple-900 sm:h-screen">
        <div className="absolute top-32 z-30 w-full bg-transparent sm:top-28">
          <h2 className="mx-auto flex w-full items-center justify-center px-12 text-center text-3xl text-gray-200 sm:items-start sm:text-5xl">
            {dashboard.welcome}, {clientName}!
          </h2>
        </div>

        <div className="mt-60 grid grid-cols-1 place-items-center gap-4 sm:mt-24 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-4">
          <PromptCard
            size="large"
            hasScale
            order="order-1 sm:order-1"
            imageSrc="/dashboard/credits.svg"
            button={<ChatButton text={dashboard.ctaChat} />}
            title={`${credits} ${dashboard.credits}`}
            text={dashboard.available}
            onClick={undefined}
          />

          <PromptCard
            size="large"
            hasScale
            order="order-2 sm:order-2"
            button={<UpgradeAccount text={dashboard.ctaUpgrade} />}
            title={credits > 10 ? "Premium" : "Free"}
            text={dashboard.subscription}
            imageSrc="/dashboard/code-box.svg"
            onClick={undefined}
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=smart")
            }}
            order="order-3"
            title={dashboard.smart.title}
            text={dashboard.smart.subtitle}
            imageSrc="/dashboard/smart.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=improve")
            }}
            title={dashboard.performance.title}
            order="order-6"
            text={dashboard.performance.subtitle}
            imageSrc="/dashboard/bug.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=test")
            }}
            order="order-4"
            title={dashboard.test.title}
            text={dashboard.test.subtitle}
            imageSrc="/dashboard/test.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=docs")
            }}
            order="order-5"
            title={dashboard.docs.title}
            imageSrc="/dashboard/documentation.svg"
            text={dashboard.docs.subtitle}
          />
        </div>
      </div>
    </>
  )
}
