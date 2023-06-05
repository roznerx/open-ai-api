import "./chat.css"

import { useEffect, useState } from "react"
import ChatContainer from "app/home/ChatContainer"

import PromptCard from "./PromptCard"
import { CombinedMessages } from "./CombinedMessages"
import useWindowSize from "hooks/use-window-size"

export default function Chat({ generatedResponse, setCodeSentence }) {
  const [prompt, setPrompt] = useState("")
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (prompt !== "") {
      setCodeSentence(prompt)
    }
  }, [prompt, setCodeSentence])

  const chatWidth = isMobile ? "90vw" : "900px"

  return (
    <div className="mt-20 flex h-screen items-start justify-start overflow-scroll rounded-md sm:mx-auto sm:flex-row ">
      {generatedResponse.length > 0 && (
        <div className="mt-24 sm:mt-12">
          <ChatContainer
            isMobile={isMobile}
            useFullHeight
            width={chatWidth}
            messages={
              <CombinedMessages generatedMessages={generatedResponse} />
            }
          />
        </div>
      )}
      {generatedResponse.length === 0 && (
        <>
          <div className="grid h-screen grid-cols-1 place-content-center gap-3 overflow-y-auto sm:col-span-2 sm:grid-cols-4">
            <PromptCard
              imageSrc="/icons/react.png"
              onClick={setPrompt}
              title="Create React App"
              text="How to use the Create React App npm package"
            />
            <PromptCard
              onClick={setPrompt}
              imageSrc="/icons/nextjs.png"
              title="Create Next App"
              text="How to use the the Create Next App npm package"
            />
            <PromptCard
              onClick={setPrompt}
              imageSrc="/icons/typescript.png"
              title="Typescript"
              text="Explain how to use Typescript with React"
            />
            <PromptCard
              onClick={setPrompt}
              title="Vue JS"
              imageSrc="/icons/vue.png"
              text="Explain how to bootstrap a Vue JS App"
            />
            <PromptCard
              onClick={setPrompt}
              imageSrc="/icons/python.png"
              title="Python"
              text="How to create a function in Python?"
            />
            <PromptCard
              onClick={setPrompt}
              imageSrc="/icons/aws.png"
              title="AWS"
              text="Explain how to use the AWS API"
            />
            <PromptCard
              onClick={setPrompt}
              imageSrc="/icons/db.ico"
              title="Database"
              text="What's the best Database with Typescript support"
            />
            <PromptCard
              onClick={setPrompt}
              imageSrc="/icons/rtl.png"
              title="React Testing Lib"
              text="Explain how to use Jest with React Testing Library"
            />
          </div>
        </>
      )}
    </div>
  )
}
