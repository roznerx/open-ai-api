"use client"

import dynamic from "next/dynamic"

// import HomeChat from "./home/HomeChat"
import Feature from "./home/Feature"

import { useSignInModal } from "./components/modals/SignInModal"
import Script from "next/script"
import SuperHero from "./home/SuperHero"
import { Loader2 } from "lucide-react"

const HeaderWrapper = dynamic(
  () => import("./components/shared/HeaderWrapper"),
  {
    loading: () => (
      <Loader2
        size={20}
        color="white"
        className="hidden h-8 w-8 animate-spin"
      />
    ),
  },
)
const HomeChat = dynamic(() => import("./home/HomeChat"), {
  loading: () => (
    <Loader2 size={20} color="white" className="hidden h-8 w-8 animate-spin" />
  ),
})

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
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-WHLZCV41W9"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WHLZCV41W9');`,
        }}
      />
    </>
  )
}
