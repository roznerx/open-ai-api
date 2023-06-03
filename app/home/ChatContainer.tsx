"use client"

import React, { useEffect, useRef } from "react"

export default function ChatContainer({
  messages,
  useFullHeight,
  width = null,
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
    <div className="mx-auto flex pb-6 sm:mt-3 sm:ml-4 ">
      <div
        ref={chatContainerRef}
        className={` mt-6 overflow-y-scroll sm:mt-0  ${
          useFullHeight ? "max-h-[75vh] sm:max-h-[80vh]" : "max-h-[320px]"
        } ${width ? `w-[${width}]` : "w-screen"}  rounded-md bg-purple-400
       font-sans text-white `}
      >
        {messages}
      </div>
    </div>
  )
}
