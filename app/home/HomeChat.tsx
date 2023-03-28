"use client"

import {
  ChatContainer,
  Message,
  MessageList,
} from "@chatscope/chat-ui-kit-react"
import GenerateCode from "app/components/GenerateCode"
import MyModal from "app/components/Modal"
import Image from "next/image"
import React, { KeyboardEvent, useEffect, useRef, useState } from "react"
import { generateCodeWithTurbo } from "utils/generateCode"
import { parseText } from "utils/parseText"
// import tailwindConfig from "tailwind.config.js"

interface CodeMessagesProps {
  generatedMessages: string[]
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
        "You are a robust and cleaver programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
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

  const CodeMessages: React.FC<CodeMessagesProps> = ({ generatedMessages }) => {
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
                    <GenerateCode align="start" generatedCode={item.code} />
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
      <div className="mx-auto flex w-[70%] flex-row items-center justify-center">
        <div className="relative w-[100%]">
          <input
            ref={textareaRef}
            className="placeholder:text-base font-sm mt-6 max-h-12 w-full resize-none rounded-md border-none bg-purple-400 py-2.5 pl-1 font-mono text-white placeholder:pl-2 placeholder:pt-1 placeholder:text-white focus:border-transparent focus:ring-black/30"
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            onKeyDown={(e) => onCodeGeneration(e)}
            placeholder={"What do you want to build today?"}
          />
          <button className="absolute right-1 top-5 mt-2 rounded-md bg-gray-900 p-1 disabled:hover:bg-transparent">
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
          <MyModal
            body={<CodeMessages generatedMessages={generatedMessages} />}
            isOpen={modaIsOpen}
            buttonText="Ok"
            setIsOpen={setModaIsOpen}
          />
        )}
      </div>
    </>
  )
}
