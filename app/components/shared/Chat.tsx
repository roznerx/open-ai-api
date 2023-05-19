import "./chat.css"

import { parseText } from "utils/parseText"
import GenerateCode from "../GenerateCode"
import { useEffect, useState } from "react"
import ChatContainer from "app/home/ChatContainer"
import { CodeMessagesProps } from "app/home/HomeChat"
import PromptCard from "./PromptCard"

export default function Chat({ generatedResponse, setCodeSentence }) {
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    if (prompt !== "") {
      setCodeSentence(prompt)
    }
  }, [prompt])

  const LiveDemoMessages: React.FC<CodeMessagesProps> = ({
    generatedMessages,
  }) => {
    return (
      <>
        {generatedMessages.map((generatedMessage) => {
          const result = parseText(generatedMessage)

          return (
            result.length &&
            result.map((item: any) => {
              if (item.hasOwnProperty("code")) {
                // eslint-disable-next-line react/jsx-key
                return <GenerateCode align="start" generatedCode={item.code} />
              }

              if (item.hasOwnProperty("text")) {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <p className="rounded-lg bg-purple-400 p-2 text-left leading-7">
                    {item.text}
                  </p>
                )
              }
            })
          )
        })}
      </>
    )
  }

  return (
    <div className="flex items-center justify-center overflow-scroll rounded-md sm:mx-auto sm:flex-row">
      {generatedResponse.length > 0 && (
        <div className="mt-8">
          <ChatContainer
            useFullHeight
            useFullWidth
            messages={
              <LiveDemoMessages generatedMessages={generatedResponse} />
            }
          />
        </div>
      )}
      {generatedResponse.length === 0 && (
        <div className="mx-auto flex max-h-[75vh] w-full flex-col items-center justify-center sm:mt-20 sm:max-w-[1000px] sm:flex-row sm:flex-wrap sm:justify-between sm:gap-1">
          <PromptCard
            onClick={setPrompt}
            title="Create React App"
            text="How to use the Create React App npm package"
          />
          <PromptCard
            onClick={setPrompt}
            title="Create React App"
            text="How to use the the Create React App package"
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
            title="Database"
            text="What's the best Database with Typescript support"
          />
          <PromptCard
            onClick={setPrompt}
            title="Testing"
            text="Explain how to use Jest with React Testing Library"
          />
          <PromptCard
            onClick={setPrompt}
            title="Database"
            text="What's the best Database with Typescript support"
          />
          <PromptCard
            onClick={setPrompt}
            title="Testing"
            text="Explain how to use Jest with React Testing Library"
          />
        </div>
      )}
    </div>
  )
}
