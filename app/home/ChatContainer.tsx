"use client"

import React, { useRef } from "react"

export default function ChatContainer({ messages, useFullHeight }: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mx-auto flex w-full items-center justify-center sm:-ml-4">
      <div
        ref={chatContainerRef}
        className={`h-auto max-h-[70vh] overflow-y-scroll text-center ${
          useFullHeight ? "sm:max-h-[65vh]" : "h-auto"
        } mt-2 w-[90%] rounded-md bg-transparent font-sans text-white
       sm:w-[60vw]`}
      >
        {messages}
      </div>
    </div>
  )
}
