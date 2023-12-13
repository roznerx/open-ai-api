"use client"

import React from "react"
import dynamic from "next/dynamic"

import { AI_MOOD } from "@/lib/constants"
import { useChat } from "ai/react"

import HomeChatInput from "./HomeChatInput"
import { CombinedMessages } from "app/components/shared/CombinedMessages"
import { useRouter } from "next/navigation"

const ChatContainer = dynamic(() => import("./ChatContainer"), {
  loading: () => null,
})

export default function HomeChat({ session }) {
  const userName = session && session.user?.name
  const router = useRouter()

  const {
    messages,
    input: inputValue,
    handleInputChange,
  } = useChat({
    initialMessages: [{ id: "1", role: "system", content: AI_MOOD.engineer }],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("inputValue: ", inputValue)

    router.push(`/code-chat?q=${inputValue}`)
  }

  return (
    <>
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative mt-2 h-12 w-full text-center sm:w-[900px]"
        >
          <HomeChatInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
        </form>
        <div className="h-[330px] sm:h-[380px] sm:w-[930px]">
          {messages.length > 0 && (
            <ChatContainer
              messages={
                <CombinedMessages
                  bg="transparent"
                  userName={userName}
                  //@ts-ignore
                  generatedMessages={messages.slice(1)}
                />
              }
            />
          )}
        </div>
      </div>
    </>
  )
}
