"use client"
import Header from "../Header"

export default function HeaderWrapper({
  session,
  userHasAccount,
  setShowSignInModal,
  showSignInModal,
}) {
  return (
    <>
      <Header
        showSignInModal={showSignInModal}
        session={session}
        userHasAccount={userHasAccount}
        setShowSignInModal={setShowSignInModal}
      />
    </>
  )
}
