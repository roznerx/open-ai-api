"use client"

import "../../styles/waterfall.css"
import Chat from "./Chat"

export default function SuperHero() {
  let bgMatrix = Array(70)
    .fill(1, 0)
    .map((_, i) => {
      return (
        <>
          <span
            key={Math.random()}
            className={`element mx-1 ${
              i < 30
                ? "text-xs opacity-30"
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
            key={Math.random()}
            className={`element  ${
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
            key={Math.random()}
            className={`element ${
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
            key={Math.random()}
            className={`element ${
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
            key={Math.random()}
            className={` element ${
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
            key={Math.random()}
            className={`element  ${
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
            key={Math.random()}
            className={`element  ${
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
            key={Math.random()}
            className={`element  ${
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
            key={Math.random()}
            className={` element ${
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
            key={Math.random()}
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
            key={Math.random()}
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

  // useEffect(() => {

  // }, [])

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
      <Chat />
      <div className="relative flex h-96 w-full flex-row flex-wrap pt-7">
        {bgMatrix}
      </div>

      {/* <canvas className="flex h-96 w-screen flex-wrap pt-7" id="canv"></canvas> */}
    </>
  )
}
