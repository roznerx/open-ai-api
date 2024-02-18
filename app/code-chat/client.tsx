"use client"

import { useState } from "react"
import Chat from "app/components/shared/Chat"

// import { useSignInModal } from "app/components/modals/SignInModal"
import InputChat from "app/components/shared/InputChat"
import MyModal from "app/components/Modal"
import { Hand } from "lucide-react"
import { useChat } from "ai/react"
import { AI_MOOD } from "@/lib/constants"

export default function Client({
  session,
  translations,
  modalTranslations,
  initialQuery = "",
}: any) {
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)

  let messageFromHome: any

  messageFromHome =
    initialQuery !== ""
      ? { id: "2", role: "user", content: initialQuery }
      : null

  const userName = session && session.user?.name
  const {
    messages,
    setInput,
    stop,
    reload,
    isLoading,
    input: inputValue,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: AI_MOOD.engineer,
        ...messageFromHome,
      },
    ],
  })

  return (
    <>
      <div className="absolute inset-0 pt-14 text-3xl text-celeste">
        <h1 className="mx-auto flex w-full justify-center">
          Chat with Genius Minds on Engineering Topics
        </h1>
      </div>
      <Chat
        translations={translations}
        setInput={setInput}
        userName={userName}
        messages={messages.slice(1)}
      />
      <InputChat
        reload={reload}
        initialQuery={initialQuery}
        translations={translations}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {isLoading && (
        <div
          className="absolute right-4 top-48 h-12 w-12 cursor-pointer"
          onClick={() => stop()}
        >
          <Hand size={32} color="white" />
        </div>
      )}
      <MyModal
        title={modalTranslations?.title}
        isCreditsModal
        body={modalTranslations?.description}
        isOpen={creditsModaIsOpen}
        buttonText={modalTranslations?.cta}
        buttonLink="/pricing"
        setIsOpen={setCreditsModaIsOpen}
      />
    </>
  )
}
