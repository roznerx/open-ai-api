"use client"

import { motion } from "framer-motion"
import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
})

export default function SuperHero({ translations }) {
  return (
    <>
      <section className={`${inter.variable}  mb-5 mt-36 font-sans`}>
        <motion.h2
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: -10 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          className="z-40 mx-auto w-[95%] cursor-default items-center justify-center bg-gradient-to-r from-mint to-blue bg-clip-text p-3 text-center text-4xl font-semibold text-transparent
sm:flex sm:w-full sm:text-6xl"
        >
          {translations.title}
        </motion.h2>
        <p className="text-lg z-40 mt-2 w-[100%] items-center justify-center px-3 text-center font-sans text-white sm:text-3xl">
          {translations.subtitle}
          <span className="relative">
            <span className="absolute left-2 top-1 ml-2 inline-flex sm:top-0">
              <span className="absolute top-1 sm:relative sm:top-0">
                <span className="text-[12px] text-mint">✦</span>
                <span className="absolute bottom-2 left-2 text-[18px] text-mint">
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
