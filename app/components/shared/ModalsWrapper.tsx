"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ModalsWrapper({
  session,
  SignInModal,
  setShowSignInModal,
}) {
  const searchParams = useSearchParams()
  const action = searchParams && searchParams.get("action")

  useEffect(() => {
    if (action === "authenticate") {
      setShowSignInModal(true)
    }
  }, [searchParams, action])

  return <>{!session && <SignInModal />}</>
}
