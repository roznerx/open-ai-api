"use client"

import Image from "next/image"
import suggestions from "../../animations/suggestions.json"
import generation from "../../animations/generation.json"
import bugDetection from "../../animations/bugDetection.json"
import { Poppins } from "next/font/google"

import Lottie from "lottie-react"

const popins = Poppins({
  variable: "--font-popins",
  weight: ["100", "300", "600"],
})

const interactivity: any = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.2],
      type: "stop",
      frames: [0],
    },
    {
      visibility: [0.2, 0.5],
      type: "seek",
      frames: [0, 135],
    },
    {
      visibility: [0.5, 0.9],
      type: "stop",
      frames: [150],
    },
  ],
}
const AISuggestions = () => {
  return <Lottie interactivity={interactivity} animationData={suggestions} />
}
const AIGeneration = () => {
  return <Lottie interactivity={interactivity} animationData={generation} />
}
const BugDetection = () => {
  return <Lottie interactivity={interactivity} animationData={bugDetection} />
}

export default function Feature() {
  return (
    <>
      <section className={`mt-8 text-white ${popins.variable} font-popins`}>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          <div className="mx-auto flex items-center justify-start">
            <AISuggestions />
          </div>
          <div className="mt-14 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">
              Smart suggestions
            </h1>
            <p className="mt-2 p-8">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-start">
            <AISuggestions />
          </div>
          <div className="mt-14 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">
              Smart suggestions
            </h1>
            <p className="mt-2 p-8">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-start">
            <AISuggestions />
          </div>
          <div className="mt-14 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">
              Smart suggestions
            </h1>
            <p className="mt-2 p-8">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-start">
            <AISuggestions />
          </div>
          <div className="mt-14 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">
              Smart suggestions
            </h1>
            <p className="mt-2 p-8">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-start">
            <AISuggestions />
          </div>
          <div className="mt-14 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">
              Smart suggestions
            </h1>
            <p className="mt-2 p-8">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
