"use client"

import { SessionProvider } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useSignInModal } from "./components/modals/SignInModal"
import { useEffect } from "react"

export default function Provider({ children, translations }) {
  const searchParams = useSearchParams()
  const { SignInModal, setShowSignInModal } = useSignInModal({
    tip: "Redeem your free initial 10 credits.",
    translations,
  })

  useEffect(() => {
    if (searchParams && searchParams.get("action") === "signUp") {
      setShowSignInModal(true)
    } else {
      setShowSignInModal(false)
    }
  }, [setShowSignInModal, searchParams])

  return (
    <SessionProvider>
      <SignInModal />
      {children}
    </SessionProvider>
  )
}
