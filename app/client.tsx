"use client"

import SuperHero from "./home/SuperHero"

import Hero from "./home/Hero"
import ShowCaseCard from "./home/ShowCaseCard"
import Feature from "./home/Feature"
import HomeChat from "./home/HomeChat"

export default function Client({ translations, session }) {
  return (
    <>
      {/* <div className="absolute inset-0 animate-pulseCustom before:absolute before:inset-0 before:block before:h-full before:w-full before:rounded-full before:bg-gradient-to-br before:from-mint/30 before:to-blue/20 before:blur-[120px] before:content-[''] md:mx-auto md:h-[750px] md:w-[1250px] lg:flex"></div> */}
      <div className="relative mx-auto mt-20 flex h-[450px] w-[920px] flex-col justify-center overflow-hidden rounded-xl bg-[url('/home/bg-input.png')] bg-cover bg-center bg-no-repeat pt-28">
        <SuperHero translations={translations?.home?.superHero} />
        <HomeChat session={session} />
      </div>
      <Hero />
      <ShowCaseCard
        videoSrc="static/side-by-side-epic.mp4"
        title={translations?.showCase?.title}
        showArrowInButton={true}
        description={translations?.showCase?.subtitle}
        buttonText={`${translations?.showCase?.seeVideo}`}
      />
      <Feature translations={translations?.home} />
    </>
  )
}
