"use client"

import SuperHero from "./home/SuperHero"
import ProgrammingBuddy from "./home/ProgrammingBuddy"
import HomeChat from "./home/HomeChat"
import WhyCodeGenius from "./home/WhyCodeGenius"
import TestimonialsSection from "./home/TestimonialsSection"
import Faqs from "./pricing/faqs"
import SyncYourFlow from "./home/SyncYourFlow"

export default function Client({ translations, session }) {
  return (
    <>
      <div className="black h-[897px] w-screen bg-[radial-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-600/70 via-violet-800 to-black ">
        <div className="relative mx-auto flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-xl pt-28">
          <SuperHero translations={translations?.home?.superHero} />
          <HomeChat session={session} />
        </div>
      </div>
      <ProgrammingBuddy />
      <WhyCodeGenius />
      <SyncYourFlow />
      <TestimonialsSection />
      <div className="my-24 flex w-full items-center justify-center">
        <Faqs isHome translations={translations.pricing.faqs} />
      </div>
      {/* <Feature translations={translations?.home} /> */}
    </>
  )
}
