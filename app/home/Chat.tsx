"use client"

import { Send, SendIcon } from "lucide-react"
import Image from "next/image"
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import tailwindConfig from "tailwind.config.js"

export default function Chat() {
  const textareaRef = useRef<any>(null)

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])
  const [codeSentence, setCodeSentence] = useState("")

  function onCodeGeneration(e: KeyboardEvent<HTMLTextAreaElement>): void {
    // throw new Error("Function not implemented.")
  }

  function onArrowPress() {
    // throw new Error("Function not implemented.")
  }

  return (
    <>
      <div className="relative m-auto w-[82%]">
        <textarea
          ref={textareaRef}
          className="placeholder:text-base font-base mt-6 w-[100%] resize-none rounded-md border-none bg-purple-400 py-2.5 pl-1 font-mono text-white placeholder:pl-2 placeholder:pt-1 placeholder:text-white focus:border-transparent focus:ring-black/30"
          value={codeSentence}
          onChange={(e) => setCodeSentence(e.target.value)}
          onKeyDown={(e) => onCodeGeneration(e)}
          rows={1}
          placeholder={"What do you want to build?"}
        ></textarea>

        <button className="absolute mt-1 rounded-md bg-gray-900 p-1 disabled:hover:bg-transparent md:bottom-2.5 md:right-2">
          <Image
            className="rotate-10 mb-1 mr-2 pt-2 pb-1 pl-2 text-white"
            alt="Send"
            width={24}
            height={24}
            src="/home/send.svg"
            onClick={() => {
              onArrowPress()
            }}
          />
        </button>
      </div>
    </>
  )
}
