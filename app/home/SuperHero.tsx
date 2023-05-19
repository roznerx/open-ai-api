"use client"

import { motion } from "framer-motion"
import { Inter } from "next/font/google"
import "../../styles/waterfall.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
})

export default function SuperHero() {
  return (
    <>
      <section className={`${inter.variable} mt-36 mb-5 font-sans`}>
        <motion.h2
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mx-auto w-[95%] items-center justify-center bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text p-3 text-center font-sans text-4xl font-semibold text-transparent
sm:flex sm:w-full sm:text-6xl"
        >
          Create Genius Code
        </motion.h2>
        <p className="text-lg mt-2 w-[100%] items-center justify-center px-3 text-center font-sans text-white sm:text-2xl">
          Take your code ideas to the next level with the power of AI
        </p>
      </section>
    </>
  )
}

// const effectClass = "effect"
// let bgMatrix = Array(80)
//   .fill(1, 0)
//   .map((_, i) => {
//     return (
//       <>
//         <span
//           key={i}
//           className={`${effectClass}2 text-[10px] ${
//             i < 30
//               ? "opacity-30"
//               : i < 50
//               ? "text-sm opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-gradient-dark`}
//         >
//           0
//         </span>
//         <span
//           key={i}
//           className={`${effectClass}2  ${
//             i < 30
//               ? " text-[10px] opacity-30"
//               : i < 50
//               ? "text-sm opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           0
//         </span>
//         <span
//           key={i}
//           className={`${effectClass}2 ${
//             i < 30
//               ? " text-[10px] opacity-30"
//               : i < 50
//               ? "opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-600`}
//         >
//           1
//         </span>
//         <span
//           key={i}
//           className={`${effectClass} ${
//             i < 30
//               ? " text-[10px] opacity-30"
//               : i === 50
//               ? " opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           1
//         </span>
//         <span
//           key={i}
//           className={`${effectClass}  ${
//             i < 30
//               ? " text-[10px] opacity-30"
//               : i < 50
//               ? " opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-gradient-dark`}
//         >
//           0
//         </span>
//         <span
//           key={i}
//           className={`${effectClass} ${
//             i < 30
//               ? " text-[10px] opacity-30"
//               : i < 50
//               ? " opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           1
//         </span>
//         <span
//           key={i}
//           className={` ${
//             i < 30
//               ? "text-[10px] opacity-30"
//               : i < 50
//               ? "opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           0
//         </span>
//         <span
//           key={i}
//           className={`${
//             i < 30
//               ? "text-[10px] opacity-30"
//               : i < 50
//               ? "opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           1
//         </span>
//         <span
//           key={i}
//           className={`${effectClass} ${
//             i < 30
//               ? "text-[10px] opacity-30"
//               : i < 50
//               ? " opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           1
//         </span>
//         <span
//           key={i}
//           className={`${effectClass}2  ${
//             i < 30
//               ? "text-[10px] opacity-30"
//               : i < 50
//               ? "text-sm opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-500`}
//         >
//           1
//         </span>
//         <span
//           key={i}
//           className={`${
//             i < 30
//               ? "text-[10px] opacity-30"
//               : i < 50
//               ? "text-sm opacity-50"
//               : i > 50 && i < 80
//               ? "opacity-80"
//               : "opacity-100"
//           } px-3 text-purple-600`}
//         >
//           1
//         </span>
//       </>
//     )
//   })
/* <div
    className={`absolute top-0 mt-14 flex h-[600px] w-full flex-row flex-wrap overflow-hidden`}
  >
    {bgMatrix}
  </div> */
