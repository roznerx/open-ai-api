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
    <div className="flex h-screen items-start justify-start overflow-scroll rounded-md sm:mx-auto sm:mt-0 sm:flex-row ">
      {generatedResponse.length > 0 && (
        <div className="mt-24 sm:mt-12">
          <ChatContainer
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
          <div className="mb-20 grid max-h-[80vh] grid-cols-1 place-items-center gap-3 overflow-y-auto pt-24 sm:col-span-2 sm:grid-cols-4">
            <PromptCard
              onClick={setPrompt}
              title="Create React App"
              text="How to use the Create React App npm package"
            />
            <PromptCard
              onClick={setPrompt}
              title="Create Next App"
              text="How to use the the Create Next App npm package"
            />
            <PromptCard
              onClick={setPrompt}
              title="Typescript"
              text="Explain how to use Typescript with React"
            />
            <PromptCard
              onClick={setPrompt}
              title="Development"
              text="What are the best practice in software development"
            />
            <PromptCard
              onClick={setPrompt}
              title="Python"
              text="How to create a function in Python?"
            />
            <PromptCard
              onClick={setPrompt}
              title="AWS"
              text="Explain how to use the AWS API"
            />
            <PromptCard
              onClick={setPrompt}
              title="Database"
              text="What's the best Database with Typescript support"
            />
            <PromptCard
              onClick={setPrompt}
              title="React Testing"
              text="Explain how to use Jest with React Testing Library"
            />
          </div>
        </>
      )}
    </div>
  )
}
