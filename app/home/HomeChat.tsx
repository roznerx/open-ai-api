"use client"

import React, { useRef, useState } from "react"

const HomeChatInput = dynamic(() => import("./HomeChatInput"), {
  loading: () => null,
})

import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

export default function HomeChat({ translations }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue !== "") {
      router.push(`/code-chat?q=${inputValue}`)
    } else if (inputRef.current) {
      inputRef.current.focus()
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
            inputRef={inputRef}
            translations={translations}
            inputValue={inputValue}
            handleInputChange={setInputValue}
          />
        </form>
      </div>
    </>
  )
}
