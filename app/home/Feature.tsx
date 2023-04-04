"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import suggestions from "../../animations/suggestions.json"
import generation from "../../animations/generation.json"
import bugDetection from "../../animations/bugDetection.json"
import { Poppins } from "next/font/google"

import Lottie from "lottie-react"
import { useState } from "react"

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
  return (
    <>
      <Lottie interactivity={interactivity} animationData={suggestions} />
    </>
  )
}
const AIGeneration = () => {
  return <Lottie interactivity={interactivity} animationData={generation} />
}
const BugDetection = () => {
  return <Lottie interactivity={interactivity} animationData={bugDetection} />
}

export default function Feature() {
  const [verticalScroll, setVerticalScroll] = useState(0)
  const { scrollYProgress, scrollY } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
    setVerticalScroll(latest)
  })
  return (
    <>
      <section className={`mt-8 text-white ${popins.variable} font-popins`}>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className={`fixed bottom-0 hidden ${
              verticalScroll > 1200 ? "sm:block" : "hidden"
            } left-0 right-0 h-[550px] w-[550px]  bg-gradient-radial  from-gradient-dark/80 via-transparent to-transparent p-20  brightness-50 sm:-mt-[150px] sm:h-[800px] sm:w-[1000px]`}
          ></motion.div>
          <motion.div
            style={{ scaleX }}
            className={`absolute -left-[300px] top-${
              verticalScroll !== 0 && verticalScroll
            } mx-auto -mt-[100px] h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform  rounded-full bg-gradient-radial from-gradient-dark/80 via-transparent to-transparent pb-9 brightness-50 sm:-mt-[150px] sm:h-[800px] sm:w-[1000px]`}
          ></motion.div>
          <div className="mx-auto mb-24 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <AISuggestions />
            {/* <div className="brightness-25 absolute left-[-316px] -top-8 h-[750px] w-[750px] rounded-full bg-gradient-radial from-gradient-dark/90 via-transparent to-transparent pb-9" /> */}
          </div>
          <div className="mt-0 p-2 sm:mt-20">
            <h1 className="pl-3 text-center text-5xl font-bold sm:text-left">
              Smart suggestions
            </h1>
            <p className="mt-2 w-full p-4 text-center sm:w-[80%] sm:text-left">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mx-auto mb-24 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <BugDetection />
          </div>
          <div className="mt-0 p-2 sm:mt-20">
            <h1 className="pl-3 text-center text-5xl font-bold sm:text-left">
              Test Generation
            </h1>
            <p className="mt-2 w-full p-4 text-center sm:w-[80%] sm:text-left">
              You can generate tests based on the provided function. With this
              feature, developers can quickly and easily generate test cases for
              their functions, ensuring that their code is thoroughly tested and
              reliable. This feature can save developers a significant amount of
              time and effort in manually creating test cases.
            </p>
          </div>
          <div className="mx-auto flex w-96 items-center justify-start sm:ml-40 sm:w-full">
            <AIGeneration />
          </div>
          <div className="mt-0 p-2 sm:mt-20">
            <h1 className="pl-3 text-center text-5xl font-bold sm:text-left">
              Code Ideas
            </h1>
            <p className="mt-2 w-full p-4 text-center sm:w-[80%] sm:text-left">
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
