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

const UpgradeAccount = () => (
  <Link href="/pricing">
    <GradientButton width="200px" text="Upgrade Account" />
  </Link>
)

const ChatButton = () => (
  <Link href="/code-chat">
    <GradientButton width="200px" text="Coding Chat" />
  </Link>
)

export default function Client({
  session,
  credits,
  purchasedCredits,
  opConfirmation,
}) {
  const { setShowSignInModal } = useSignInModal({})
  const searchParams = useSearchParams()
  const router = useRouter()
  const [thanksMessage, setThanksMessage] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

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
            Welcome, {clientName}!
          </h2>
        </div>

        <div className="mt-60 grid grid-cols-1 place-items-center gap-4 sm:mt-24 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-4">
          <PromptCard
            size="large"
            hasScale
            order="order-1 sm:order-1"
            imageSrc="/dashboard/credits.svg"
            button={<ChatButton />}
            title={`${credits} Credits`}
            text="Available"
            onClick={undefined}
          />

          <PromptCard
            size="large"
            hasScale
            order="order-2 sm:order-2"
            button={<UpgradeAccount />}
            title={credits > 10 ? "Premium" : "Free"}
            text="Subscription Plan"
            imageSrc="/dashboard/code-box.svg"
            onClick={undefined}
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=smart")
            }}
            order="order-3"
            title="Smart Suggestions"
            text="Catch errors and optimize your code as you go."
            imageSrc="/dashboard/smart.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=improve")
            }}
            title="Code Improvements"
            order="order-6"
            text="Improve the perfomance  of your App."
            imageSrc="/dashboard/bug.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=test")
            }}
            order="order-4"
            title="Test Generation"
            text="Generate reliable unit test cases  in seconds."
            imageSrc="/dashboard/test.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=docs")
            }}
            order="order-5"
            title="Documentation"
            imageSrc="/dashboard/documentation.svg"
            text="Generate clear and concise documentation."
          />
        </div>
      </div>
    </>
  )
}
