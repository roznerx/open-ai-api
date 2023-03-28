"use client"

import "../../styles/waterfall.css"
import HomeChat from "./HomeChat"

export default function SuperHero() {
  const effectClass = "effect"
  let bgMatrix = Array(40)
    .fill(1, 0)
    .map((_, i) => {
      return (
        <>
          <span
            key={i}
            className={`${effectClass} mx-1 w-1 ${
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
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
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
                ? "text-xs opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-400`}
          >
            1
          </span>
          <span
            key={i}
            className={` ${
              i < 30
                ? "text-xs opacity-30"
                : i === 50
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
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
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
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-500`}
          >
            1
          </span>
          <span
            key={i}
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
                : i < 50
                ? "text-sm opacity-50"
                : i > 50 && i < 80
                ? "opacity-80"
                : "opacity-100"
            } px-3 text-indigo-700`}
          >
            0
          </span>
          <span
            key={i}
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
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
            className={`${effectClass} ${
              i < 30
                ? "text-xs opacity-30"
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
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
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
            className={`  ${
              i < 30
                ? "text-xs opacity-30"
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
        <h1 className="p-3 text-center text-6xl text-white dark:text-white">
          Create <p className="inline-block  text-mint">Genius Code</p>
        </h1>
        <p className="mt-2 px-3 text-center text-2xl text-white">
          Create Better, Faster and Easier Code with your AI Genius.
        </p>
      </section>
      <HomeChat />
      <div className="relative flex h-96 w-full flex-row flex-wrap overflow-hidden bg-opacity-75 ">
        {bgMatrix}
      </div>

      {/* <canvas className="flex h-96 w-screen flex-wrap pt-7" id="canv"></canvas> */}
    </>
  )
}
