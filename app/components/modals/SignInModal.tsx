"use client"
import dynamic from "next/dynamic"
import { useState, useCallback, useMemo } from "react"

const SignInModal = dynamic(
  () => import("./SignIn").then((mod) => mod.SignInModal),
  {
    loading: () => <p className="hidden">Loading...</p>,
  },
)

export function useSignInModal({
  userHasAccount,
  tip,
}: {
  userHasAccount?: boolean
  tip?: string
}) {
  const [showSignInModal, setShowSignInModal] = useState(false)

  const SignInModalCallback = useCallback(() => {
    return showSignInModal ? (
      <SignInModal
        tip={tip}
        userHasAccount={userHasAccount}
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    ) : null
  }, [showSignInModal, tip, userHasAccount])

  return useMemo(
    () => ({
      setShowSignInModal,
      SignInModal: SignInModalCallback,
      showSignInModal,
    }),
    [setShowSignInModal, SignInModalCallback, showSignInModal],
  )
}
