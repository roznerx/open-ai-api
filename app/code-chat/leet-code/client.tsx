"use client"
import { AI_MOOD } from "@/lib/constants"
import { useChat } from "ai/react"
import Chat from "app/components/shared/Chat"
import InputChat from "app/components/shared/InputChat"
import { useEffect, useState } from "react"

const categories = [
  "LinkedIn List",
  "Queues",
  "Stacks",
  "Hash Tables",
  "Heaps",
  "Recursion",
  "Trees",
  "Tries",
  "Binary Search",
  "Dynamic Programming",
  "Graph Theory",
  "DFS Traversal",
  "BFS Traversal",
  "Dijkstra Algorithm",
]
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
    // Check if the button element exists
    if (questionPrompt !== "") {
      setInput(questionPrompt)
    }
  }, [questionPrompt, setInput, setQuestionPrompt])

  return (
    <>
      <div className="absolute inset-0 my-16 ">
        <h1 className="mx-auto flex w-[65%] flex-row justify-center text-center text-2xl text-celeste sm:w-full">
          Mastering LeetCode Problems Simplified
        </h1>
        {/* <ul className="mx-auto flex h-10 w-[60%] flex-row flex-nowrap gap-1 space-x-8  overflow-x-auto bg-red-200">
          {categories.map((item) => (
            <li
              key={item}
              className="flex-shrink-0 rounded-lg border border-gray-300 bg-slate-100 p-2"
            >
              <Link
                className="h-auto w-auto cursor-pointer underline"
                href={`?cat=${item}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
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
    </>
  )
}
