"use client"

// import Image from "next/image";
// import Link from "next/link";
import React, { useEffect, useRef } from "react"

export default function ChatContainer({ messages }: any) {
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
  ])

  if (chatContainerRef && chatContainerRef.current) {
    console.log("offsetHeight ", chatContainerRef.current.offsetHeight)
    console.log("scrollHeight ", chatContainerRef.current.scrollHeight)
  }
  return (
    <div
      ref={chatContainerRef}
      className="mt-3 max-h-80 w-[100%] overflow-hidden overflow-y-scroll rounded-md bg-purple-400 px-3 font-mono text-white sm:w-[800px]"
    >
      {messages}
    </div>
  )
}
