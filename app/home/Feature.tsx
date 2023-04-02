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
          <div className="mt-20 p-2">
            <h1 className="pl-3 text-5xl font-bold">Smart suggestions</h1>
            <p className="mt-2 w-[80%] p-4">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-start">
            <BugDetection />
          </div>
          <div className="mt-20 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">
              Test Generation
            </h1>
            <p className="mt-2 w-[80%] p-4">
              You can generate tests based on the provided function. With this
              feature, developers can quickly and easily generate test cases for
              their functions, ensuring that their code is thoroughly tested and
              reliable. This feature can save developers a significant amount of
              time and effort in manually creating test cases.
            </p>
          </div>
          <div className="mx-auto flex items-center justify-start">
            <AIGeneration />
          </div>
          <div className="mt-20 p-2">
            <h1 className="pl-3 font-popins text-5xl font-bold">Code Ideas</h1>
            <p className="mt-2 w-[80%] p-4">
              Our software includes a feature that provides developers with code
              ideas based on the context of their current project. This feature
              can be especially useful for new developers who may not be as
              familiar with the language or libraries they are working with.
              With this feature, developers can save time in researching and
              experimenting with new code solutions, resulting in faster
              development cycles and increased productivity.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
