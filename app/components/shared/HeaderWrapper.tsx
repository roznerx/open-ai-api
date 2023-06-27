"use client"
import Header from "../Header"

export default function HeaderWrapper({
  translations,
  session,
  userHasAccount,
  setShowSignInModal,
  showSignInModal,
}) {
  return (
    <>
      <Header
        translations={translations}
        showSignInModal={showSignInModal}
        session={session}
        userHasAccount={userHasAccount}
        setShowSignInModal={setShowSignInModal}
      />
    </>
  )
}
