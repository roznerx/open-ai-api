"use client"

import PromptCard from "app/components/shared/PromptCard"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import React, { useEffect } from "react"
import ContactFormModal from "app/components/modals/ContactFormModal"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"
import GradientButton from "app/components/buttons/gradientButton"
import { Confetti } from "utils/confetti"

const UpgradeAccount = () => (
  <Link href="/pricing">
    <GradientButton width="200px" text="Upgrade Account" />
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
      <div className="mx-auto h-full w-[95%] dark:bg-purple-900 sm:ml-16">
        <div className="flex flex-row">
          <span className="text-md absolute top-24 ml-2 font-bold text-white sm:top-28 sm:ml-10 sm:text-2xl">
            Welcome, {clientName}!
          </span>
        </div>
        <div className="mt-12 flex w-full grow-0 flex-col items-center justify-between gap-4 pt-8 sm:mt-24 sm:flex-row sm:flex-wrap sm:justify-center">
          <PromptCard
            size="large"
            hasScale
            order="order-2 sm:order-1"
            imageSrc="/dashboard/credits.svg"
            onClick={undefined}
            title={credits}
            text="Available Credits"
          />

          <PromptCard
            size="large"
            hasScale
            order="order-1 sm:order-2"
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
              router.push("/code-idea?mode=imrove")
            }}
            title="Code Improvement"
            order="order-6"
            text="Improve your code, find alternative ways to make your code more efficient."
            imageSrc="/dashboard/bug.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=test")
            }}
            order="order-4"
            title="Test Generation"
            text="Generate test cases that cover  your code is thoroughly tested and reliable."
            imageSrc="/dashboard/test.svg"
          />

          <PromptCard
            onClick={() => {
              router.push("/code-idea?mode=docs")
            }}
            order="order-5"
            title="Documentation"
            imageSrc="/dashboard/documentation.svg"
            text="Generate clear and concise documentation for your code, helping you saving precious time."
          />
        </div>
      </div>
    </>
  )
}
