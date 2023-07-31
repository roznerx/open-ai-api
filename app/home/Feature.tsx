import React from "react"
import Lottie from "lottie-react"
import Suggestions from "../../animations/smartImprovements.json"
import TestGeneration from "../../animations/generating-tests.json"
import codeDocumentation from "../../animations/codeDocumentation.json"

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

export default function Feature({ translations }) {
  return (
    <>
      <section className={`mt-8 font-sans text-white`}>
        <div className="mx-auto mb-8 mt-28 w-full p-4 text-center sm:w-[60%]">
          <h3 className="mx-auto bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
            {translations?.feature?.title}
          </h3>
          <p className="text-xl my-8 text-gray-200 sm:text-2xl">
            {translations?.feature?.subtitle}
          </p>
        </div>
        <div className="mb-24 grid grid-cols-1 gap-1 sm:grid-cols-2">
          <div className="mx-auto mb-10 mt-12 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <Lottie interactivity={interactivity} animationData={Suggestions} />
          </div>
          <div className="my-auto mt-0 flex flex-col sm:mt-16 sm:h-[280px]">
            <h4
              className="mx-auto w-[100%]  bg-gradient-to-br from-[#A1FFE0] to-[#2C9DC0] bg-clip-text text-center text-4xl font-bold text-transparent sm:ml-0 sm:w-[80%] sm:pl-3
                    sm:text-left"
            >
              {translations?.superHero?.smart?.title}
            </h4>
            <p className="my-auto mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left">
              {translations?.superHero?.smart?.subtitle}
            </p>
          </div>
          <div className="mx-auto mb-10 mt-12 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <Lottie
              interactivity={interactivity}
              animationData={TestGeneration}
            />
          </div>
          <div className="my-auto mt-0 flex flex-col sm:mt-16 sm:h-[280px]">
            <h4 className="mx-auto w-[90%] bg-gradient-to-br from-[#A1FFE0] to-[#2C9DC0] bg-clip-text pl-3 text-center text-4xl font-bold text-transparent sm:mx-0 sm:mt-4 sm:text-left md:w-[85%]">
              {translations?.superHero?.test?.title}
            </h4>
            <p className="mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left">
              {translations?.superHero?.test?.subtitle}
            </p>
          </div>
          <div className="mx-auto mb-10 mt-12 flex w-96 items-center justify-start sm:ml-40 sm:w-full">
            <Lottie
              interactivity={interactivity}
              animationData={codeDocumentation}
            />
          </div>
          <div className="my-auto flex flex-col pt-4 sm:mt-16 sm:h-[280px]">
            <h5 className="mx-auto w-[90%] bg-gradient-to-br from-[#A1FFE0] to-[#2C9DC0] bg-clip-text pl-3 text-center text-4xl font-bold text-transparent sm:mx-0 sm:mt-0 sm:text-left">
              {translations?.superHero?.docs?.title}
            </h5>
            <p className="mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left">
              {translations?.superHero?.docs?.subtitle}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
