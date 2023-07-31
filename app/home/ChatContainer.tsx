"use client"

import React, { useRef } from "react"

export default function ChatContainer({ messages, useFullHeight }: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mx-auto flex sm:ml-4">
      <div
        ref={chatContainerRef}
        className={`overflow-y-scroll ${
          useFullHeight ? "max-h-[75vh] sm:max-h-[75vh]" : "max-h-[380px]"
        } mt-2 w-[90vw] rounded-md bg-transparent font-sans text-white
       sm:mt-2 sm:w-[900px] `}
      >
        {messages}
      </div>
    </div>
  )
}
