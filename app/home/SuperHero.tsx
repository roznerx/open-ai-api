"use client"
import "../../styles/waterfall.css"

import HomeChat from "./HomeChat"

export default function SuperHero() {
  const effectClass = "effect"
  let bgMatrix = Array(70)
    .fill(1, 0)
    .map((_, i) => {
      return (
        <>
          <span
            key={i}
            className={`${effectClass} mx-1 w-1 text-[10px] ${
              i < 30
                ? "opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-400`}
          >
            0
          </span>
          <span
            key={i}
            className={` ${effectClass}  ${
              i < 30
                ? " text-[10px] opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-500`}
          >
            0
          </span>
          <span
            key={i}
            className={`${effectClass} ${
              i < 30
                ? " text-[10px] opacity-30"
                : i < 50
                ? "opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-400`}
          >
            1
          </span>
          <span
            key={i}
            className={` ${effectClass}  ${
              i < 30
                ? " text-[10px] opacity-30"
                : i === 50
                ? " opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-700`}
          >
            1
          </span>
          <span
            key={i}
            className={`${effectClass}  ${
              i < 30
                ? " text-[10px] opacity-30"
                : i < 50
                ? " opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-500`}
          >
            0
          </span>
          <span
            key={i}
            className={` ${effectClass}  ${
              i < 30
                ? " text-[10px] opacity-30"
                : i < 50
                ? " opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-500`}
          >
            1
          </span>
          <span
            key={i}
            className={` ${
              i < 30
                ? "text-[10px] opacity-30"
                : i < 50
                ? "opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-700`}
          >
            0
          </span>
          <span
            key={i}
            className={`${
              i < 30
                ? "text-[10px] opacity-30"
                : i < 50
                ? "opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-700`}
          >
            1
          </span>
          <span
            key={i}
            className={`${effectClass} ${
              i < 30
                ? "text-[10px] opacity-30"
                : i < 50
                ? " opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-700`}
          >
            1
          </span>
          <span
            key={i}
            className={` ${effectClass}  ${
              i < 30
                ? "text-[10px] opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-700`}
          >
            1
          </span>
          <span
            key={i}
            className={` ${effectClass}  ${
              i < 30
                ? "text-[10px] opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-600`}
          >
            1
          </span>
        </>
      )
    })

  return (
    <>
      <section>
        <div
          className={`absolute top-0 mt-14 flex h-[600px] w-full flex-row flex-wrap overflow-hidden bg-opacity-75 `}
        >
          {bgMatrix}
        </div>
        <h1
          className="mx-auto w-[90%] items-center justify-center bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text p-3 text-center text-6xl
text-transparent sm:flex sm:w-full"
        >
          Create Genius Code
        </h1>
        <p className="mt-2 w-[100%] items-center justify-center px-3 text-center text-2xl text-white">
          Create Better, Faster and Easier Code with your AI Genius.
        </p>
      </section>
      <HomeChat />
    </>
  )
}
