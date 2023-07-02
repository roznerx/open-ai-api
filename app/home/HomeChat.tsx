"use client"

import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

import { useSignInModal } from "app/components/modals/SignInModal"

import { AI_MOOD } from "@/lib/constants"
import { Send } from "lucide-react"

import { useChat } from "hooks/use-chat"
import useWindowSize from "hooks/use-window-size"
import { updateAnonymousUserUsage } from "utils/harperDBhelpers"

const Modal = dynamic(() => import("app/components/Modal"), {
  loading: () => null,
})
const ChatContainer = dynamic(() => import("./ChatContainer"), {
  loading: () => null,
})

const CombinedMessages = dynamic(
  () => import("app/components/shared/CombinedMessages"),
  {
    loading: () => null,
  },
)

export default function HomeChat({
  ip,
  apiCalls,
  session,
  loggedUserData,
  translations,
  creditsModalTranslations,
}) {
  const existingCredits = loggedUserData && loggedUserData[0]?.credits
  const [userApiCalls, setUserApiCalls] = useState<number>(apiCalls)
  const textareaRef = useRef<any>(null)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(
    existingCredits === 0 ? true : false,
  )
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (textareaRef && textareaRef.current && !isMobile) {
      textareaRef.current.focus()
    }
  }, [isMobile])

  const userName = session && session.user?.name

  const { SignInModal, setShowSignInModal } = useSignInModal({
    tip: "Redeem your initial 25 credits.",
    translations,
  })
  const {
    messages,
    isLoading,
    input: inputValue,
    handleInputChange,
    handleSubmit,
    stop,
  } = useChat({
    initialMessages: [{ id: "1", role: "system", content: AI_MOOD.engineer }],
    onFinish: async () => {
      if (!session) {
        const response = await updateAnonymousUserUsage(ip)
        setUserApiCalls(response?.apiCalls)
      }
    },
  })

  useEffect(() => {
    if (!session && userApiCalls >= 10 && isLoading) {
      stop()
      setShowSignInModal(true)
    }
  }, [userApiCalls, session, stop, isLoading, setShowSignInModal])

  useEffect(() => {
    if (session?.user && !session?.user?.credits && isLoading) {
      stop()
      setCreditsModaIsOpen(true)
    }
  }, [session, stop, isLoading])

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
            className="font-lg z-40 h-12 w-[95%] rounded-lg bg-purple-400 py-2.5 pl-3 
             pr-12 text-white caret-mint/70 outline-0 placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px] placeholder:text-mint/60 placeholder:text-white hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 sm:w-[900px]"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={messages.length === 1 ? translations?.placeholder : ""}
          />
          <button
            type="submit"
            title="Submit your prompt"
            aria-label="Submit your prompt"
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

        <Modal
          title={creditsModalTranslations.title}
          isCreditsModal
          body={creditsModalTranslations.description}
          isOpen={creditsModaIsOpen}
          buttonText={creditsModalTranslations.cta}
          buttonLink="/pricing"
          setIsOpen={setCreditsModaIsOpen}
        />
      </div>
    </>
  )
}
