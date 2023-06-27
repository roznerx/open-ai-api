"use client"

import Lottie from "lottie-react"
import Image from "next/image"

import Suggestions from "../../animations/smartImprovements.json"
import TestGeneration from "../../animations/generating-tests.json"
import codeDocumentation from "../../animations/codeDocumentation.json"

import Button from "app/components/Button"
import Link from "next/link"
import ShowCaseCard from "./ShowCaseCard"
import React from "react"

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

export const AISuggestions = React.memo(() => {
  return (
    <>
      <Lottie interactivity={interactivity} animationData={Suggestions} />
    </>
  )
})
const AIGeneration = React.memo(() => {
  return <Lottie interactivity={interactivity} animationData={TestGeneration} />
})

const CodeDocumentation = React.memo(() => {
  return (
    <Lottie interactivity={interactivity} animationData={codeDocumentation} />
  )
})

export default function Feature({ setShowSignInModal, session, translations }) {
  const CreateAccountButton = (
    <Button
      buttonTextColor="dark"
      variant="mint"
      loading={false}
      text={translations?.header?.register}
      onClick={() => {
        setShowSignInModal(true)
      }}
    />
  )
  const GoAndExploreChat = (
    <Link href="/code-chat">
      <Button
        buttonTextColor="dark"
        variant="mint"
        loading={false}
        text={translations?.chat?.cta}
      />
    </Link>
  )

  return (
    <>
      <section className={`mt-8 font-sans text-white`}>
        <div className="mx-auto mt-28 mb-8 w-full p-4 text-center sm:w-[60%]">
          <h2 className="mx-auto bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
            {translations?.feature?.title}
          </h2>
          <p className="text-xl my-8 text-gray-200 sm:text-2xl">
            {translations?.feature?.subtitle}
          </p>
        </div>
        <div className="mb-24 grid grid-cols-1 gap-1 sm:grid-cols-2">
          <div className="mx-auto mb-10 mt-12 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <AISuggestions />
          </div>
          <div className="my-auto mt-0 flex flex-col sm:mt-16 sm:h-[280px]">
            <h3 className="mx-auto w-[100%] text-center text-4xl font-bold text-white sm:ml-0 sm:w-[80%] sm:pl-3 sm:text-left">
              {translations?.feature?.smart.title}
            </h3>
            <p className="my-auto mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left">
              {translations?.feature?.smart.subtitle}
            </p>
          </div>
          <div className="mx-auto mb-10 mt-12 flex w-96 items-start justify-start sm:ml-40 sm:w-full">
            <AIGeneration />
          </div>
          <div className="my-auto mt-0 flex flex-col sm:mt-16 sm:h-[280px]">
            <h4 className="mx-auto w-[90%] pl-3 text-center text-4xl font-bold sm:mx-0 sm:mt-4 sm:text-left md:w-[85%]">
              {translations?.feature?.test.title}
            </h4>
            <p className="mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left">
              {translations?.feature?.test.subtitle}
            </p>
          </div>
          <div className="mx-auto mb-10 mt-12 flex w-96 items-center justify-start sm:ml-40 sm:w-full">
            <CodeDocumentation />
          </div>
          <div className="my-auto flex flex-col pt-4 sm:mt-16 sm:h-[280px]">
            <h5 className="mx-auto w-[90%] pl-3 text-center text-4xl font-bold sm:mx-0 sm:mt-0 sm:text-left">
              {translations?.feature?.docs.title}
            </h5>
            <p className="mt-2 w-full p-4 text-center text-gray-200 sm:w-[80%] sm:text-left">
              {translations?.feature?.docs.subtitle}
            </p>
          </div>
        </div>
        <div className="my-14 sm:my-20">
          <ShowCaseCard
            title={translations?.chat?.title}
            description={translations?.chat?.subtitle}
            image={
              <Image
                src="/home/chat.svg"
                alt="Chat with Code Genius"
                width={427}
                height={301}
              />
            }
            button={!session ? CreateAccountButton : GoAndExploreChat}
          />
        </div>
      </section>
    </>
  )
}
