"use client"

import React, { useEffect, useRef } from "react"

export default function ChatContainer({ messages, useFullHeight }: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = React.useState(0)

  useEffect(() => {
    if (chatContainerRef && chatContainerRef.current) {
      setScrollHeight(chatContainerRef.current?.scrollHeight)
      chatContainerRef.current?.scrollTo({
        top: scrollHeight - chatContainerRef.current.offsetHeight,
        behavior: "smooth",
      })
    }
  }, [
    chatContainerRef,
    chatContainerRef?.current?.scrollHeight,
    scrollHeight,
    setScrollHeight,
  ])

  return (
    <div className="mx-auto flex pb-6 sm:mt-3 sm:w-full ">
      <div
        ref={chatContainerRef}
        className={`mx-auto overflow-y-scroll  ${
          useFullHeight ? "max-h-[75vh] sm:max-h-[80vh]" : "max-h-[320px]"
        } w-[80%] rounded-md bg-purple-400
       font-sans text-white `}
      >
        {messages}
      </div>
    </div>
  )
}
