"use client"
import dynamic from "next/dynamic"
import { useState, useCallback, useMemo } from "react"

const SignInModal = dynamic(
  () => import("./SignIn").then((mod) => mod.SignInModal),
  {
    loading: () => null,
  },
)

export function useSignInModal({
  userHasAccount,
  tip,
  translations,
}: {
  userHasAccount?: boolean
  tip?: string
  translations?: any
}) {
  const [showSignInModal, setShowSignInModal] = useState(false)

  const SignInModalCallback = useCallback(() => {
    return showSignInModal ? (
      <SignInModal
        tip={tip}
        translations={translations}
        userHasAccount={userHasAccount}
        showSignInModal={showSignInModal}
      />
    ) : null
  }, [showSignInModal, tip, translations, userHasAccount])

  return useMemo(
    () => ({
      setShowSignInModal,
      SignInModal: SignInModalCallback,
      showSignInModal,
    }),
    [setShowSignInModal, SignInModalCallback, showSignInModal],
  )
}
