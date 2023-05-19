"use client"

import HeaderWrapper from "./components/shared/HeaderWrapper"
import SuperHero from "./home/SuperHero"
import HomeChat from "./home/HomeChat"
import Feature from "./home/Feature"

import { useSignInModal } from "./components/modals/SignInModal"

export default function Client({
  session,
  userHasAccount,
  ip,
  apiCalls,
  loggedUserData,
}) {
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal({
    userHasAccount,
  })

  return (
    <>
      <SignInModal />
      <HeaderWrapper
        setShowSignInModal={setShowSignInModal}
        showSignInModal={showSignInModal}
        session={session}
        userHasAccount={userHasAccount}
      />
      <SuperHero />
      <HomeChat
        ip={ip}
        apiCalls={apiCalls}
        session={session}
        loggedUserData={loggedUserData}
      />
      <Feature session={session} setShowSignInModal={setShowSignInModal} />
    </>
  )
}
