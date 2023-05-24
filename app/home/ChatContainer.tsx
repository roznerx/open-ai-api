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
    <div className="mx-auto ml-4 flex max-h-[75vh] max-w-[100vw] pb-6 sm:mt-3 sm:w-[900px] sm:max-w-[900px]">
      <div
        ref={chatContainerRef}
        className={`mx-auto overflow-y-scroll  ${
          useFullHeight ? "max-h-[75vh]" : "max-h-[320px]"
        } w-[95%] rounded-md bg-purple-400
       p-2 font-sans text-white sm:w-[900px]`}
      >
        {messages}
      </div>
    </div>
  )
}
