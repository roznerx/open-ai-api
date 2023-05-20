"use client" // Error components must be Client Components

import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import React, { useEffect } from "react"
import Header from "./components/Header"
import { useSignInModal } from "./components/modals/SignInModal"
import GradientButton from "./components/buttons/gradientButton"
import ContactFormModal from "./components/modals/ContactFormModal"
import Footer from "./components/Footer"

export default function ErrorLog({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const session = useSession()
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

  const { setShowSignInModal, showSignInModal } = useSignInModal({})
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const userName = session?.data?.user?.name ?? ""
  console.log("userName:", userName)
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
      <Header
        showSignInModal={showSignInModal}
        session={session?.data}
        userHasAccount={true}
        setShowSignInModal={setShowSignInModal}
      />
      <div className="mx-auto mt-28 mb-8 w-full p-4 text-center sm:w-[60%]">
        <motion.h2 className="mx-auto bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
          Code Genius is truly a Genius but not perfect.
        </motion.h2>
        <motion.p className="text-xl my-8 text-gray-200 sm:text-2xl">
          We have detected an error. The cause of an error can sometimes be
          temporary. In these cases, simply trying again might resolve the
          issue.
        </motion.p>
        <div className="mx-auto w-48">
          <GradientButton text="Try Again" onClick={reset} />
        </div>
        <motion.div className="text-xl my-8 text-gray-200 sm:text-2xl">
          <p>If the issue persists, please contact us.</p>
          <div className="mx-auto mt-12 w-48">
            <GradientButton
              width="40%"
              text="Contact Us"
              onClick={() => setOpenContactForm(true)}
            />
          </div>
        </motion.div>
      </div>
      <Footer session={session?.data} />
    </>
  )
}
