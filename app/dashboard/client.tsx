"use client"

import PromptCard from "app/components/shared/PromptCard"
import useWindowSize from "hooks/use-window-size"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import React, { useEffect } from "react"
import { Confetti } from "utils/confetti"
import ContactFormModal from "app/components/modals/ContactFormModal"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"

async function SendCongratsEmail(session, credits) {
  //Send congrats email to the user
  const payload = {
    name: session?.user?.name,
    credits,
    isNewPuchase: true,
    contactEmail: session?.user?.email,
    message: "Congratulations! Your credits have been added to your account.",
  }
  await fetch("/api/email/send", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

const UpgradeAccount = () => (
  <Link
    href="/pricing"
    className={`my-auto mx-2 mt-2 flex cursor-pointer flex-row
    rounded-lg bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] p-[2px] font-mono
  sm:items-start sm:justify-center`}
  >
    <div className="relative h-[48px] w-auto rounded-lg bg-purple-500">
      <div className="text-sm px-3 py-3 text-center font-bold text-white sm:mx-auto sm:px-6">
        Upgrade Account
      </div>
    </div>
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
  const [thanksMessage, setThanksMessage] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

  useEffect(() => {
    if (searchParams && searchParams.has("success")) {
      if (opConfirmation && purchasedCredits > 0) {
        //THANKS MESSAGE WITH DIALOG
        setThanksMessage(true)
        setOpenContactForm(true)
        //SEND EMAIL
        SendCongratsEmail(session, purchasedCredits)
        //SEND CONFETI
        Confetti()
      }
    }
  }, [searchParams])

  const { isMobile } = useWindowSize()
  const cardWidth = isMobile ? "w-[100%]" : "w-[47%]"
  const router = useRouter()
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
            width={cardWidth}
            hasScale
            order="order-2 sm:order-1"
            imageSrc="/dashboard/credits.svg"
            onClick={undefined}
            title={credits}
            text="Credits Available"
          />

          <PromptCard
            size="large"
            hasScale
            order="order-1 sm:order-2"
            width={cardWidth}
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
