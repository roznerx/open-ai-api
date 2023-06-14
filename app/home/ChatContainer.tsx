"use client"

import { usePathname } from "next/navigation"
import React, { useEffect, useRef } from "react"

export default function ChatContainer({
  userName,
  loading,
  codeSentence,
  messages,
  isMobile,
  useFullHeight,
}: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = React.useState(0)
  const pathName = usePathname()

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
        {codeSentence?.length > 0 && pathName === "/code-chat" ? (
          <div className="mx-auto mt-2 flex overflow-scroll rounded-md sm:mx-auto sm:flex-row">
            <div className="mr-9 mb-1 flex ">
              <div className="ml-1 flex w-full items-center justify-center">
                <div className="flex items-start justify-start">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado text-center font-medium">
                    {userName.substring(0, 1)}
                  </span>
                </div>
                <div className="mx-auto ml-1 w-full rounded-lg bg-purple-400 p-2">
                  <p className="ml-1 text-left leading-7 text-white">
                    {codeSentence}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {messages}
      </div>
    </div>
  )
}
