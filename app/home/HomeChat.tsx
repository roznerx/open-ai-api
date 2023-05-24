"use client"

import Image from "next/image"
import React, {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { generateCodeWithTurbo } from "utils/generateCode"
import { parseText } from "utils/parseText"

import Hero from "./Hero"
import ChatContainer from "./ChatContainer"
import GenerateCode from "app/components/GenerateCode"
import { useSignInModal } from "app/components/modals/SignInModal"
import { updateAnonymousUserUsage } from "utils/harperDBhelpers"
import Modal from "app/components/Modal"
import { CREDITS_MODAL_COPY } from "@/lib/constants"

export interface CodeMessagesProps {
  generatedMessages: any
}

export default function HomeChat({ ip, apiCalls, session, loggedUserData }) {
  const existingCredits = loggedUserData && loggedUserData[0]?.credits
  const textareaRef = useRef<any>(null)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(
    existingCredits === 0 ? true : false,
  )
  const userId = session && session.user?.id

  const [userApiCalls, setUserApiCalls] = useState<number>(apiCalls)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [codeSentence, setCodeSentence] = useState("")

  const { SignInModal, setShowSignInModal } = useSignInModal({
    tip: "Get 25 🏆 credits for free by signing in",
  })
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const codeMessages = useRef([
    {
      role: "system",
      content:
        "You are a friendly programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
    },
  ])

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const onCodeGeneration = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (codeSentence.length === 0 || codeSentence === "") {
      return false
    }

    if (e.key === "Enter") {
      if (!session && userApiCalls >= 10) {
        setShowSignInModal(true)
        return false
      } else {
        if (existingCredits === 0) {
          setCreditsModaIsOpen(true)
          return false
        }
        codeMessages.current = [
          ...codeMessages.current,
          {
            role: "user",
            content: codeSentence,
          },
        ]
        setCodeSentence("")
        generateCodeWithTurbo(
          reader,
          codeMessages,
          setReader,
          setGeneratedCode,
          userId,
          setCreditsModaIsOpen,
        )

        //Update free trial usage
        if (!session) {
          const response = await updateAnonymousUserUsage(ip)
          setUserApiCalls(response?.apiCalls)
        }
      }
    }
  }

  const onArrowPress = async () => {
    if (existingCredits === 0) {
      setCreditsModaIsOpen(true)
      return false
    }

    if (!session && userApiCalls >= 5) {
      setShowSignInModal(true)
      return false
    }

    //Store the code sentence in the current code-messages ref.
    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: codeSentence,
      },
    ]
    setCodeSentence("")
    generateCodeWithTurbo(
      reader,
      codeMessages,
      setReader,
      setGeneratedCode,
      userId,
      setCreditsModaIsOpen,
    )

    //Update free trial usage
    if (!session) {
      const response = await updateAnonymousUserUsage(ip)
      setUserApiCalls(response.apiCalls)
    }
  }

  const generatedMessages = useMemo(
    () => generatedCode.split("<>").filter((i) => i !== ""),
    [generatedCode],
  )

  const LiveDemoMessages: React.FC<CodeMessagesProps> = React.memo(
    ({ generatedMessages }) => {
      return (
        <>
          {generatedMessages.map((generatedMessage) => {
            const result = parseText(generatedMessage)

            return result.length
              ? result.map((item: any, idx) => {
                  if (item.hasOwnProperty("text")) {
                    return (
                      <div key={idx} className="rounded-lg bg-purple-400 p-2">
                        <p
                          style={{ borderRadius: "0px" }}
                          className="ml-2 text-left leading-7"
                        >
                          {item.text}
                        </p>
                      </div>
                    )
                  } else {
                    return (
                      <GenerateCode
                        key={idx}
                        borderRadius="none"
                        align="start"
                        generatedCode={item.code}
                      />
                    )
                  }
                })
              : null
          })}
        </>
      )
    },
  )

  const hasContent = generatedMessages.length > 0

  return (
    <>
      <SignInModal />
      <Modal
        title={CREDITS_MODAL_COPY.title}
        isCreditsModal
        body={CREDITS_MODAL_COPY.description}
        isOpen={creditsModaIsOpen}
        buttonText={CREDITS_MODAL_COPY.callToAction}
        buttonLink="/pricing"
        setIsOpen={setCreditsModaIsOpen}
      />
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <div className="relative mt-2 h-12 w-full text-center sm:w-[900px]">
          <input
            ref={textareaRef}
            className="font-lg h-12 w-[95%] rounded-lg bg-purple-400 py-2.5 
             pl-3 pr-12 text-white outline-0 placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px] placeholder:text-white hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 sm:w-[900px]"
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            onKeyDown={(e) => onCodeGeneration(e)}
            placeholder={
              generatedMessages.length <= 0
                ? "What is your next Code Idea?"
                : ""
            }
          />
          <button className="absolute right-4 top-[6px] rounded-lg bg-gray-900 p-1 disabled:hover:bg-transparent sm:right-1">
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
        <div className="h-[330px] w-full sm:h-[380px] sm:w-[930px]">
          {generatedMessages.length > 0 && (
            <ChatContainer
              messages={
                <LiveDemoMessages generatedMessages={generatedMessages} />
              }
            />
          )}
        </div>
        <Hero hasContent={hasContent} />
      </div>
    </>
  )
}
