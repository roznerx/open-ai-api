"use client"

import SuperHero from "./home/SuperHero"
import ProgrammingBuddy from "./home/ProgrammingBuddy"
import HomeChat from "./home/HomeChat"
import WhyCodeGenius from "./home/WhyCodeGenius"
import TestimonialsSection from "./home/TestimonialsSection"
import Faqs from "./pricing/faqs"

export default function Client({ translations, session }) {
  return (
    <>
      <div className="h-[897px] w-screen bg-[url('/home/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
        <div className="relative mx-auto flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-xl pt-28">
          <SuperHero translations={translations?.home?.superHero} />
          <HomeChat session={session} />
        </div>
      </div>
      <ProgrammingBuddy />
      <WhyCodeGenius />
      <TestimonialsSection />
      <div className="my-24 flex w-full items-center justify-center">
        <Faqs translations={translations.pricing.faqs} />
      </div>
      {/* <Feature translations={translations?.home} /> */}
    </>
  )
}
