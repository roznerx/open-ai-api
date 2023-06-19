"use client"

import { useSignInModal } from "./components/modals/SignInModal"
import HeaderWrapper from "./components/shared/HeaderWrapper"

import Script from "next/script"
import SuperHero from "./home/SuperHero"
import Feature from "./home/Feature"
import HomeChat from "./home/HomeChat"
import Hero from "./home/Hero"

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
      <div className="absolute -right-[300px] -top-[300px] items-center justify-center before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:rounded-full before:bg-gradient-to-br before:from-mint/20 before:to-blue/30 before:blur-[120px] before:content-['']  md:mx-auto md:h-[950px] md:w-[950px] lg:flex"></div>
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
      <Hero />
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
