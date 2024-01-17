"use client"

import React, { useState } from "react"

import HomeChatInput from "./HomeChatInput"

import { useRouter } from "next/navigation"

export default function HomeChat({ translations }) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue !== "") {
      router.push(`/code-chat?q=${inputValue}`)
    }
  }

  return (
    <>
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative mt-2 h-12 w-full text-center sm:w-[900px]"
        >
          <HomeChatInput
            translations={translations}
            inputValue={inputValue}
            handleInputChange={setInputValue}
          />
        </form>
      </div>
    </>
  )
}
