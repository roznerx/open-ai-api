"use client"
import dynamic from "next/dynamic"

import { useSignInModal } from "./components/modals/SignInModal"

import HeaderWrapper from "./components/shared/HeaderWrapper"
import Script from "next/script"
import SuperHero from "./home/SuperHero"
import HomeChat from "./home/HomeChat"
import Hero from "./home/Hero"
import Feature from "./home/Feature"
import Button from "./components/Button"
import { requestFullscreen } from "utils"

const ShowCaseCard = dynamic(() => import("./home/ShowCaseCard"), {
  loading: () => null,
})

export default function Client({
  translations,
  session,
  userHasAccount,
  ip,
  apiCalls,
  loggedUserData,
}) {
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal({
    userHasAccount,
    translations: translations?.modals?.signIn,
  })

  const SeeVideoButton = (
    <Button
      buttonTextColor="dark"
      variant="mint"
      loading={false}
      text={`${translations?.showCase?.seeVideo} →`}
      onClick={() => {
        const video = document.getElementById("codevspilot") as HTMLVideoElement
        if (video) {
          video.play()
          video.addEventListener("playing", function () {
            requestFullscreen(video)
          })
        }
      }}
    />
  )
  return (
    <>
      <div className="absolute inset-0 animate-pulseCustom before:absolute before:inset-0 before:block before:h-full before:w-full before:rounded-full before:bg-gradient-to-br before:from-mint/30 before:to-blue/20 before:blur-[120px] before:content-[''] md:mx-auto md:h-[950px] md:w-[950px] lg:flex"></div>
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
        translations={translations?.home?.chat}
        creditsModalTranslations={translations?.modals?.moreCredits}
        ip={ip}
        apiCalls={apiCalls}
        session={session}
        loggedUserData={loggedUserData}
      />
      <div className="my-14 sm:my-20">
        <ShowCaseCard
          videoSrc="static/side-by-side-epic.mp4"
          title={translations?.showCase?.title}
          description={translations?.showCase?.subtitle}
          button={SeeVideoButton}
        />
      </div>
      <Hero />
      <Feature
        translations={translations?.home}
        session={session}
        setShowSignInModal={setShowSignInModal}
      />
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
