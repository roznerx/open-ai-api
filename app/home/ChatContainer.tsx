"use client"

import React, { useRef } from "react"

export default function ChatContainer({
  messages,
  isMobile,
  useFullHeight,
}: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mx-auto flex sm:ml-4">
      <div
        ref={chatContainerRef}
        className={`overflow-y-scroll ${
          useFullHeight ? "max-h-[75vh] sm:max-h-[75vh]" : "max-h-[320px]"
        } ${
          isMobile ? "w-[95vw]" : "w-[900px]"
        } mt-2 rounded-md bg-purple-400 font-sans
       text-white sm:mt-2 `}
      >
        {messages}
      </div>
    </div>
  )
}
