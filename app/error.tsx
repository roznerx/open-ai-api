"use client"

import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"

import React, { useEffect } from "react"

const GradientButton = dynamic(
  () => import("./components/buttons/gradientButton"),
  {
    loading: () => null,
  },
)
const ContactFormModal = dynamic(
  () => import("./components/modals/ContactFormModal"),
  {
    loading: () => null,
  },
)

export default function ErrorLog({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const session = useSession()
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const userName = session?.data?.user?.name ?? ""

  return (
    <>
      <ContactFormModal
        name={userName}
        isClientFeedback
        errorMessage={error}
        title="We appreciate your feedback"
        clientName={userName}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <div className="mx-auto mb-8 mt-28 w-full p-4 text-center sm:w-[60%]">
        <h2 className="mx-auto bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
          Code Genius is truly a Genius but not perfect.
        </h2>
        <p className="text-xl my-8 text-gray-200 sm:text-2xl">
          We have detected an error. The cause of an error can sometimes be
          temporary. In these cases, simply trying again might resolve the
          issue.
        </p>
        <div className="mx-auto w-48">
          <GradientButton text="Try Again" onClick={reset} />
        </div>
        <div className="text-xl my-8 text-gray-200 sm:text-2xl">
          <p>If the issue persists, please contact us.</p>
          <div className="mx-auto mt-12 w-48">
            <GradientButton
              width="40%"
              text="Contact Us"
              onClick={() => setOpenContactForm(true)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
