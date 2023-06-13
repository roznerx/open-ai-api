"use client"

import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
})

export default function SuperHero() {
  return (
    <>
      <section className={`${inter.variable}  mt-36 mb-5 font-sans`}>
        <h2
          className="z-40 mx-auto w-[95%] cursor-default items-center justify-center bg-gradient-to-r from-mint to-blue bg-clip-text p-3 text-center text-4xl font-semibold text-transparent
sm:flex sm:w-full sm:text-6xl"
        >
          Create Genius Code
        </h2>
        <p className="text-lg z-40 mt-2 w-[100%] items-center justify-center px-3 text-center font-sans text-white sm:text-2xl">
          Take your code ideas to the next level with the power of AI
        </p>
      </section>
    </>
  )
}
