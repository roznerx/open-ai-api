"use client"

import { Message } from "@chatscope/chat-ui-kit-react"
import GenerateCode from "app/components/GenerateCode"
import Image from "next/image"
import React, { KeyboardEvent, useEffect, useRef, useState } from "react"
import { generateCodeWithTurbo } from "utils/generateCode"
import { parseText } from "utils/parseText"
import ChatContainer from "./ChatContainer"
// import tailwindConfig from "tailwind.config.js"

interface CodeMessagesProps {
  generatedMessages: any
}

export default function HomeChat() {
  const [loading, setLoading] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [codeSentence, setCodeSentence] = useState("")
  const [modaIsOpen, setModaIsOpen] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const codeMessages = useRef([
    {
      role: "system",
      content:
        "You are a friendly programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
    },
  ])

  const textareaRef = useRef<any>(null)

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const onCodeGeneration = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log("codeSentence", codeSentence)

    if (codeSentence.length === 0 || codeSentence === "") {
      return false
    }
    if (e.key === "Enter") {
      codeMessages.current = [
        ...codeMessages.current,
        {
          role: "user",
          content: codeSentence,
        },
      ]
      setCodeSentence("")
      generateCodeWithTurbo(
        codeMessages,
        setLoading,
        setReader,
        setGeneratedCode,
      )
      setModaIsOpen(true)
    }
  }

  const onArrowPress = () => {
    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: codeSentence,
      },
    ]
    setCodeSentence("")
    generateCodeWithTurbo(codeMessages, setLoading, setReader, setGeneratedCode)
  }

  const generatedMessages = generatedCode.split("<>").filter((i) => i !== "")

  const LiveDemoMessages: React.FC<CodeMessagesProps> = ({
    generatedMessages,
  }) => {
    return (
      <>
        {generatedMessages.map((generatedMessage) => {
          const result = parseText(generatedMessage)

          return result.length
            ? result.map((item: any) => {
                if (item.hasOwnProperty("text")) {
                  return (
                    <Message
                      className="my-2 text-left"
                      model={{
                        message: item.text,
                        direction: "incoming",
                        position: "normal",
                      }}
                    />
                  )
                } else {
                  return (
                    <GenerateCode
                      align="start"
                      blackBackground
                      generatedCode={item.code}
                    />
                  )
                }
              })
            : null
        })}
      </>
    )
  }

  return (
    <>
      <div className="relative ml-1 mb-9 flex w-full flex-col items-center justify-center sm:mx-auto">
        <div className="relative mt-2 max-h-12 w-full text-center sm:w-[800px]">
          <input
            ref={textareaRef}
            className="md:placeholder:text-sm font-sm w-[95%] resize-none rounded-lg bg-purple-400 
             py-2.5 pl-3 font-mono text-white outline-0 placeholder:pl-2 placeholder:pt-1  placeholder:font-popins placeholder:text-[13px] placeholder:text-white hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 sm:w-[800px]"
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            onKeyDown={(e) => onCodeGeneration(e)}
            placeholder={
              generatedMessages.length <= 0
                ? "What do you want to build today?"
                : ""
            }
          />
          <button className="absolute right-4 top-1  rounded-lg bg-gray-900 p-1 disabled:hover:bg-transparent sm:right-1">
            <Image
              className="mb-1 mr-2 pt-2 pb-1 pl-2 text-white"
              alt="Send"
              width={24}
              height={24}
              src="/home/send.svg"
              onClick={() => onArrowPress()}
            />
          </button>
        </div>
        {generatedMessages.length > 0 && (
          <ChatContainer
            messages={
              <LiveDemoMessages generatedMessages={generatedMessages} />
            }
          />
        )}
      </div>
    </>
  )
}
