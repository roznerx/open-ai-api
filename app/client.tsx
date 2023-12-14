"use client"

import SuperHero from "./home/SuperHero"
import ProgrammingBuddy from "./home/ProgrammingBuddy"
import HomeChat from "./home/HomeChat"
import GoFromThisToThis from "./home/WhyCodeGenius"
import TestimonialsSection from "./home/TestimonialsSection"
import Faqs from "./pricing/faqs"
import SyncYourFlow from "./home/SyncYourFlow"

export default function Client({ translations }) {
  return (
    <>
      <div className="h-screen w-screen rounded-b-tremor-default bg-[radial-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-600/70 via-violet-800 to-black ">
        <div className="relative mx-auto flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-xl">
          <SuperHero translations={translations?.home?.superHero} />
          <HomeChat />
        </div>
      </div>
      <ProgrammingBuddy />
      <GoFromThisToThis />
      <SyncYourFlow />
      <TestimonialsSection />
      <div className="my-24 flex w-full items-center justify-center">
        <Faqs isHome translations={translations.pricing.faqs} />
      </div>
      {/* <Feature translations={translations?.home} /> */}
    </>
  )
}
