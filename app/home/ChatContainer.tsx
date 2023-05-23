"use client"

// import Image from "next/image";
// import Link from "next/link";
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
    chatContainerRef.current,
    chatContainerRef.current?.scrollHeight,
    scrollHeight,
    setScrollHeight,
  ])

  return (
    <div className="mx-auto mt-4 mb-4 ml-4 flex max-h-[80vh] max-w-[100vw] sm:mt-3 sm:w-[900px] sm:max-w-[900px]">
      <div
        ref={chatContainerRef}
        className={`mx-auto overflow-y-scroll  ${
          useFullHeight ? "m-h-[80vh]" : "max-h-[320px]"
        } w-[95%] rounded-md bg-purple-400
       p-4 font-sans text-white sm:w-[900px]`}
      >
        {messages}
      </div>
    </div>
  )
}
