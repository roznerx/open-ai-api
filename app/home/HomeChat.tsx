"use client"

import React, { useState } from "react"

const HomeChatInput = dynamic(() => import("./HomeChatInput"), {
  loading: () => null,
})

import dynamic from "next/dynamic"

export default function HomeChat({ translations, labelText }) {
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <HomeChatInput
          labelText={labelText}
          translations={translations}
          inputValue={inputValue}
          handleInputChange={setInputValue}
        />
      </div>
    </>
  )
}
