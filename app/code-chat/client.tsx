"use client"

import { useEffect, useState } from "react"
import Chat from "app/components/shared/Chat"

// import { useSignInModal } from "app/components/modals/SignInModal"
import InputChat from "app/components/shared/InputChat"
import MyModal from "app/components/Modal"
import { Hand } from "lucide-react"
import { useChat } from "ai/react"
import { AI_MOOD } from "@/lib/constants"
import { useSignInModal } from "app/components/modals/SignInModal"
import { useRouter } from "next/navigation"

export default function Client({ session, translations, modalTranslations }) {
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const { setShowSignInModal } = useSignInModal({ translations })
  const router = useRouter()
  const userName = session && session.user?.name
  const {
    messages,
    setInput,
    stop,
    isLoading,
    input: inputValue,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: [{ id: "1", role: "system", content: AI_MOOD.engineer }],
    onFinish: async () => {
      //count tokens??
    },
  })

  useEffect(() => {
    if (!session) {
      router.push("code-chat?action=signUp")
    }
  }, [])

  useEffect(() => {
    if (session?.user && !session?.user?.credits && isLoading) {
      stop()
      setCreditsModaIsOpen(true)
    }
  }, [session, stop, isLoading])

  return (
    <>
      <Chat
        translations={translations}
        setInput={setInput}
        userName={userName}
        messages={messages.slice(1)}
      />
      <InputChat
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

{
  /* <Modal
        body="Our servers are taking longer than expected. We suggest
        rewording your instruction or input to get a faster result."
        isOpen={modaIsOpen}
        buttonText="Ok"
        setIsOpen={setModaIsOpen}
      />
      <Modal
        body="What should we call this question?"
        onSave={onSaveQuestionModal}
        isOpen={showSavePromptModal}
        propmptName={questionName}
        handleInputChange={handleInputChange}
        savePropmptName
        buttonText="Save"
        setIsOpen={setShowSavePromptModal}
      /> */
}
