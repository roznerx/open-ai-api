"use client"

import React, { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

import { AI_MOOD } from "@/lib/constants"
import { useChat } from "ai/react"
import useWindowSize from "hooks/use-window-size"

import HomeChatInput from "./HomeChatInput"
import { CombinedMessages } from "app/components/shared/CombinedMessages"

const ChatContainer = dynamic(() => import("./ChatContainer"), {
  loading: () => null,
})

export default function HomeChat({ session }) {
  const textareaRef = useRef<any>(null)

  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (textareaRef && textareaRef.current && !isMobile) {
      textareaRef.current.focus()
    }
  }, [isMobile])

  const userName = session && session.user?.name

  const {
    messages,
    input: inputValue,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: [{ id: "1", role: "system", content: AI_MOOD.engineer }],
  })

  console.log("messages:", messages)

  return (
    <>
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative mt-2 h-12 w-full text-center sm:w-[900px]"
        >
          <HomeChatInput
            messagesLength={messages.length}
            textareaRef={textareaRef}
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
