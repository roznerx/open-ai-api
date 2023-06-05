"use client"

import React, { useEffect, useRef } from "react"

export default function ChatContainer({
  messages,
  isMobile,
  useFullHeight,
}: any) {
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
    <div className="mx-auto flex sm:ml-4 ">
      <div
        ref={chatContainerRef}
        className={`overflow-y-scroll ${
          useFullHeight ? "max-h-[75vh] sm:max-h-[75vh]" : "max-h-[320px]"
        } ${
          isMobile ? "w-screen" : "w-[900px]"
        } rounded-md bg-purple-400 font-sans
       text-white sm:mt-2 `}
      >
        {messages}
      </div>
    </div>
  )
}
