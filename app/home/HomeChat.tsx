"use client"

import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

import { AI_MOOD } from "#/lib/constants"

import { useChat } from "hooks/use-chat"

import useWindowSize from "hooks/use-window-size"
import { updateAnonymousUserUsage } from "utils/harperDBhelpers"

import HomeChatInput from "./HomeChatInput"

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
  setShowSignInModal,
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
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative mt-2 h-12 w-full text-center sm:w-[900px]"
        >
          <HomeChatInput
            textareaRef={textareaRef}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            messages={messages}
            translations={translations}
          />
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
          title={creditsModalTranslations?.title}
          isCreditsModal
          body={creditsModalTranslations?.description}
          isOpen={creditsModaIsOpen}
          buttonText={creditsModalTranslations?.cta}
          buttonLink="/pricing"
          setIsOpen={setCreditsModaIsOpen}
        />
      </div>
    </>
  )
}
