import "./chat.css"

import ChatContainer from "app/home/ChatContainer"

import PromptCard from "./PromptCard"
import { CombinedMessages } from "./CombinedMessages"
import useWindowSize from "hooks/use-window-size"

export default function Chat({ userName, messages, setInput, translations }) {
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
                onClick={() => setInput(translations.cards.react)}
                title="Create React App"
                text={translations.cards.react}
              />
              <PromptCard
                onClick={() => setInput(translations.cards.next)}
                imageSrc="/icons/nextjs.png"
                title="Create Next App"
                text={translations.cards.next}
              />
              <PromptCard
                onClick={() => setInput(translations.cards.ts)}
                imageSrc="/icons/typescript.png"
                title="Typescript"
                text={translations.cards.ts}
              />
              <PromptCard
                onClick={() => setInput(translations.cards.vue)}
                title="Vue JS"
                imageSrc="/icons/vue.png"
                text={translations.cards.vue}
              />
              <PromptCard
                imageSrc="/icons/python.png"
                title="Python"
                onClick={() => setInput(translations.cards.python)}
                text={translations.cards.python}
              />
              <PromptCard
                imageSrc="/icons/aws.png"
                title="AWS"
                onClick={() => setInput(translations.cards.aws)}
                text={translations.cards.aws}
              />
              <PromptCard
                imageSrc="/icons/db.ico"
                title="Database"
                onClick={() => setInput(translations.cards.db)}
                text={translations.cards.db}
              />
              <PromptCard
                onClick={() => setInput(translations.cards.rtl)}
                imageSrc="/icons/rtl.png"
                title="React Testing Library"
                text={translations.cards.rtl}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
