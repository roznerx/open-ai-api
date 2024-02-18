"use client"
import { AI_MOOD } from "@/lib/constants"
import { useChat } from "ai/react"
import Chat from "app/components/shared/Chat"
import InputChat from "app/components/shared/InputChat"
import { useEffect, useState } from "react"

export default function Client({
  session,
  translations,
  initialQuery = "",
}: any) {
  const userName = session && session.user?.name
  const [questionPrompt, setQuestionPrompt] = useState("")

  const {
    messages,
    setInput,
    reload,
    input: inputValue,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: AI_MOOD.leetCode,
      },
    ],
  })

  useEffect(() => {
    console.log("questionPrompt", questionPrompt)

    // Check if the button element exists
    if (questionPrompt !== "") {
      setInput(questionPrompt)
    }
  }, [questionPrompt, setInput, setQuestionPrompt])

  return (
    <div className="flex h-full justify-start">
      <div className="absolute inset-0 pt-14 text-3xl text-celeste">
        <h1 className="mx-auto flex w-full justify-center">
          Mastering LeetCode Problems Simplified
        </h1>
      </div>
      <div className="flex justify-center">
        <Chat
          messages={messages.slice(1)}
          setQuestionPrompt={setQuestionPrompt}
          translations={translations}
          setInput={setInput}
          userName={userName}
        />
        <InputChat
          reload={reload}
          initialQuery={initialQuery}
          translations={translations}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
