import "./chat.css"

import ChatContainer from "app/home/ChatContainer"

import PromptCard from "./PromptCard"
import { CombinedMessages } from "./CombinedMessages"
import useWindowSize from "hooks/use-window-size"

export default function Chat({ userName, messages, setInput }) {
  const { isMobile } = useWindowSize()

  const chatWidth = isMobile ? "90vw" : "900px"

  return (
    <>
      <div className="mx-auto flex overflow-scroll rounded-md sm:mx-auto sm:flex-row">
        {messages.length > 0 && (
          <div className="mx-auto mt-24 w-full">
            <ChatContainer
              isMobile={isMobile}
              useFullHeight
              width={chatWidth}
              messages={
                <CombinedMessages
                  userName={userName}
                  generatedMessages={messages}
                />
              }
            />
          </div>
        )}
        {messages.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="grid max-h-[65vh] grid-cols-1 place-items-center gap-4 overflow-y-auto sm:col-span-2 sm:h-screen sm:grid-cols-4 sm:place-content-center">
              <PromptCard
                imageSrc="/icons/react.png"
                onClick={() =>
                  setInput("Explain how to use the create react app package")
                }
                title="Create React App"
                text="Explain how to use the create react app package"
              />
              <PromptCard
                onClick={() =>
                  setInput("How should I use the Create Next App npm package?")
                }
                imageSrc="/icons/nextjs.png"
                title="Create Next App"
                text="How should I use the Create Next App npm package?"
              />
              <PromptCard
                onClick={() =>
                  setInput("Explain how to use Typescript with React")
                }
                imageSrc="/icons/typescript.png"
                title="Typescript"
                text="Explain how to use Typescript with React"
              />
              <PromptCard
                onClick={() =>
                  setInput("Explain how to bootstrap a Vue JS App")
                }
                title="Vue JS"
                imageSrc="/icons/vue.png"
                text="Explain how to bootstrap a Vue JS App"
              />
              <PromptCard
                imageSrc="/icons/python.png"
                title="Python"
                onClick={() => setInput("How to create a function in Python?")}
                text="How to create a function in Python?"
              />
              <PromptCard
                imageSrc="/icons/aws.png"
                title="AWS"
                onClick={() => setInput("Explain how to use the AWS API")}
                text="Explain how to use the AWS API"
              />
              <PromptCard
                imageSrc="/icons/db.ico"
                title="Database"
                onClick={() =>
                  setInput("What's the best Database with Typescript support?")
                }
                text="What's the best Database with Typescript support?"
              />
              <PromptCard
                onClick={() =>
                  setInput("Explain how to use Jest with React Testing Library")
                }
                imageSrc="/icons/rtl.png"
                title="React Testing Lib"
                text="Explain how to use Jest with React Testing Library"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
