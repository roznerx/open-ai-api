"use client"

import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
})

export default function SuperHero({ translations }) {
  return (
    <>
      <section className={`${inter.variable} mb-5 mt-36 pt-14 font-sans`}>
        <h2 className="justify-centerbg-clip-text z-40 mx-auto w-[95%] items-center p-3 text-center text-4xl font-semibold text-transparent text-white sm:flex sm:w-full sm:text-6xl">
          Achieve greater code with the power of your
        </h2>
        <h3
          className="z-40 mx-auto w-[95%] cursor-default items-center justify-center bg-gradient-to-r from-mint
           to-blue bg-clip-text p-3 text-center text-4xl font-semibold text-transparent sm:flex sm:w-full sm:text-6xl"
        >
          {translations.title}
        </h3>
        <p
          className="text-lg z-40 mt-2 w-[100%] items-center justify-center px-3 text-center font-sans
         text-white sm:text-3xl"
        >
          {translations.subtitle}
          <span className="relative">
            <span className="absolute left-2 top-1 ml-2 inline-flex sm:top-0">
              <span className="absolute top-0 sm:relative sm:top-0">
                <span className="absolute -top-2 right-[2px] text-[10px] text-mint">
                  ✦
                </span>
                <span className="text-[12px] text-mint">✦</span>
                <span className="absolute bottom-2 left-2 text-[16px] text-mint">
                  ✦
                </span>
              </span>
            </span>
          </span>
        </p>
      </section>
    </>
  )
}
