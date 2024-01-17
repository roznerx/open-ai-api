"use client"

import SuperHero from "./home/SuperHero"
import ProgrammingBuddy from "./home/ProgrammingBuddy"
import HomeChat from "./home/HomeChat"
import GoFromThis from "./home/GoFromThis"
import TestimonialsSection from "./home/TestimonialsSection"
import Faqs from "./pricing/faqs"
import SyncYourFlow from "./home/SyncYourFlow"
import CodeFaster from "./home/CodeFaster"

export default function Client({ translations }) {
  return (
    <>
      <div className="h-screen w-screen bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-black via-violet-800 to-fuchsia-600/70 ">
        <div className="relative mx-auto flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-xl">
          <SuperHero translations={translations?.home?.superHero} />
          <HomeChat translations={translations?.home?.input} />
        </div>
      </div>
      <div className="bg-gradient-to-b from-black via-violet-800/30 to-purple-900">
        <ProgrammingBuddy translations={translations?.home?.programmingBuddy} />
        <CodeFaster translations={translations?.home?.faster} />
        <GoFromThis translations={translations?.home?.goFrom} />
        <SyncYourFlow translations={translations?.home?.stayInSync} />
      </div>
      <div className="bg-gradient-to-b from-purple-900 via-violet-800/30 to-black">
        <TestimonialsSection translations={translations?.home?.testimonials} />
        <div className="flex w-full items-center justify-center pb-24">
          <Faqs isHome translations={translations.pricing.faqs} />
        </div>
      </div>
    </>
  )
}
