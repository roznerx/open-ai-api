"use client"

import React, { useRef, useState } from "react"
import dynamic from "next/dynamic"

import { useSignInModal } from "app/components/modals/SignInModal"

import { AI_MOOD, CREDITS_MODAL_COPY } from "@/lib/constants"
import { Loader2, Send } from "lucide-react"
import { CombinedMessages } from "app/components/shared/CombinedMessages"
import useWindowSize from "hooks/use-window-size"
import { useChat } from "hooks/use-chat"
import { Message } from "ai"

export interface CodeMessagesProps {
  generatedMessages: Message[]
  fontColor?: string
  bg?: string
  loading?: boolean
  userName?: any
  userPrompt?: any
}

const Modal = dynamic(() => import("app/components/Modal"), {
  loading: () => (
    <Loader2 size={20} color="white" className="hidden h-8 w-8 animate-spin" />
  ),
})
const ChatContainer = dynamic(() => import("./ChatContainer"), {
  loading: () => (
    <Loader2 size={20} color="white" className="hidden h-8 w-8 animate-spin" />
  ),
})

const Hero = dynamic(() => import("./Hero"), {
  loading: () => (
    <Loader2 size={20} color="white" className="hidden h-8 w-8 animate-spin" />
  ),
})

export default function HomeChat({ ip, apiCalls, session, loggedUserData }) {
  const existingCredits = loggedUserData && loggedUserData[0]?.credits
  const textareaRef = useRef<any>(null)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(
    existingCredits === 0 ? true : false,
  )
  // useEffect(() => {
  //   if (textareaRef && textareaRef.current) {
  //     textareaRef.current.focus()
  //   }
  // }, [])
  const userId = session && session.user?.id
  const userName = session && session.user?.name

  const { isMobile } = useWindowSize()

  const { SignInModal, setShowSignInModal } = useSignInModal({
    tip: "Redeem your initial 25 credits.",
  })
  const {
    messages,
    input: inputValue,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: [{ id: "1", role: "system", content: AI_MOOD.engineer }],
  })

  const hasContent = messages.length > 0

  return (
    <>
      <SignInModal />
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative mt-2 h-12 w-full text-center sm:w-[900px]"
        >
          <input
            ref={textareaRef}
            className="font-lg z-40 h-12 w-[95%] rounded-lg bg-purple-400 py-2.5 
             pl-3 pr-12 text-white outline-0 placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px] placeholder:text-white hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 sm:w-[900px]"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={
              messages.length <= 0 ? "What is your next Code Idea?" : ""
            }
          />
          <button
            type="submit"
            className="absolute right-4 top-[4px] rounded-lg bg-gray-900 p-1 disabled:hover:bg-transparent sm:right-1"
          >
            <Send
              className="mb-2 mr-2 rotate-45 pt-1  pl-2 text-mint"
              width={25}
              height={25}
            />
          </button>
        </form>
        <div className="h-[330px] sm:h-[380px] sm:w-[930px]">
          {messages.length > 0 && (
            <ChatContainer
              isMobile={isMobile}
              messages={
                <CombinedMessages
                  bg="transparent"
                  userName={userName}
                  generatedMessages={messages.slice(1)}
                />
              }
            />
          )}
        </div>
        <Hero hasContent={hasContent} />
        <Modal
          title={CREDITS_MODAL_COPY.title}
          isCreditsModal
          body={CREDITS_MODAL_COPY.description}
          isOpen={creditsModaIsOpen}
          buttonText={CREDITS_MODAL_COPY.callToAction}
          buttonLink="/pricing"
          setIsOpen={setCreditsModaIsOpen}
        />
      </div>
    </>
  )
}
