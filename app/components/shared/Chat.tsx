import "./chat.css"

import ChatContainer from "app/home/ChatContainer"

import { PromptCard } from "./PromptCard"
import { CombinedMessages } from "./CombinedMessages"
import useWindowSize from "hooks/use-window-size"
import { usePathname, useRouter } from "next/navigation"
import { LEET_CODE } from "@/lib/constants"
import { Message } from "ai/react/dist"
import { Dispatch, SetStateAction } from "react"

export default function Chat({
  userName,
  messages,
  setInput,
  translations,
  setQuestionPrompt,
}: {
  userName: string
  messages: Message[]
  setInput: (arg) => void
  translations: any
  setQuestionPrompt?: Dispatch<SetStateAction<string>>
}) {
  const { isMobile } = useWindowSize()

  const router = useRouter()
  const chatWidth = isMobile ? "90vw" : "900px"
  const pathName = usePathname()

  return (
    <>
      <div className="mx-auto flex rounded-md sm:mx-auto">
        {messages.length > 0 && (
          <div className="mt-40 w-full">
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
        {messages.length === 0 && pathName !== "/code-chat/leet-code" && (
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 place-items-center gap-8 overflow-y-auto sm:col-span-2 sm:h-screen sm:grid-cols-4 sm:place-content-center">
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
                onClick={() => router.push("/code-chat/leet-code")}
                imageSrc="/icons/leet-code.png"
                title="Leet Code"
                text={translations.cards.leet}
              />
              <PromptCard
                imageSrc="/icons/db.ico"
                title="Database"
                onClick={() => setInput(translations.cards.db)}
                text={translations.cards.db}
              />
            </div>
          </div>
        )}
        {messages.length === 0 && pathName === "/code-chat/leet-code" && (
          <div className="mb-8 flex items-center justify-center">
            <div className="grid grid-cols-1 place-items-center gap-8 overflow-y-auto sm:col-span-2 sm:h-full sm:grid-cols-4 sm:place-content-center">
              <PromptCard
                isLeetCode
                title={LEET_CODE.merge.title}
                text={LEET_CODE.merge.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Sorting"}
              />
              <PromptCard
                isLeetCode
                title={LEET_CODE.topK.title}
                text={LEET_CODE.topK.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Frequent itemset"}
              />
              <PromptCard
                isLeetCode
                title={LEET_CODE.sortedArray.title}
                text={LEET_CODE.sortedArray.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Sorting"}
              />
              <PromptCard
                isLeetCode
                title={LEET_CODE.binarySearch.title}
                text={LEET_CODE.binarySearch.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Binary Search"}
              />
              <PromptCard
                isLeetCode
                title={LEET_CODE.commonChars.title}
                text={LEET_CODE.commonChars.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Frequent itemset"}
              />
              <PromptCard
                isLeetCode
                title={LEET_CODE.binarySearch1.title}
                text={LEET_CODE.binarySearch1.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Binary Search"}
              />
              <PromptCard
                isLeetCode
                title="Find First and Last"
                text={LEET_CODE.binarySearch2.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Binary Search"}
              />
              <PromptCard
                isLeetCode
                title={LEET_CODE.binarySearch3.title}
                text={LEET_CODE.binarySearch3.description}
                onClick={setQuestionPrompt}
                imageSrc="/icons/leet-code.png"
                difficulty="Medium"
                category={"Binary Search"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
