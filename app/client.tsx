"use client"

import { useSignInModal } from "./components/modals/SignInModal"

import HeaderWrapper from "./components/shared/HeaderWrapper"
import Script from "next/script"
import SuperHero from "./home/SuperHero"

import Hero from "./home/Hero"

import ShowCaseCard from "./home/ShowCaseCard"
import Feature from "./home/Feature"
import HomeChat from "./home/HomeChat"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function Client({
  translations,
  session,
  userHasAccount,
  ip,
  apiCalls,
  loggedUserData,
}) {
  const searchParams = useSearchParams()
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal({
    tip: "Redeem your free initial 10 credits.",
    userHasAccount,
    translations: translations?.modals?.signIn,
  })

  useEffect(() => {
    if (searchParams && searchParams.get("action") === "signUp") {
      setShowSignInModal(true)
    }
  }, [setShowSignInModal, searchParams])

  return (
    <>
      <div className="absolute inset-0 animate-pulseCustom before:absolute before:inset-0 before:block before:h-full before:w-full before:rounded-full before:bg-gradient-to-br before:from-mint/30 before:to-blue/20 before:blur-[120px] before:content-[''] md:mx-auto md:h-[750px] md:w-[1250px] lg:flex"></div>
      <SignInModal />
      <HeaderWrapper
        translations={translations?.home?.header}
        setShowSignInModal={setShowSignInModal}
        showSignInModal={showSignInModal}
        session={session}
        userHasAccount={userHasAccount}
      />
      <SuperHero translations={translations?.home?.superHero} />
      <HomeChat
        setShowSignInModal={setShowSignInModal}
        translations={translations?.home?.chat}
        creditsModalTranslations={translations?.modals?.moreCredits}
        ip={ip}
        apiCalls={apiCalls}
        session={session}
        loggedUserData={loggedUserData}
      />
      <Hero />
      <ShowCaseCard
        videoSrc="static/side-by-side-epic.mp4"
        title={translations?.showCase?.title}
        showArrowInButton={true}
        description={translations?.showCase?.subtitle}
        buttonText={`${translations?.showCase?.seeVideo}`}
      />
      <Feature translations={translations?.home} />
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
