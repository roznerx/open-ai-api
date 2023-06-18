"use client"

import { useEffect, useState } from "react"
import Chat from "app/components/shared/Chat"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"
import InputChat from "app/components/shared/InputChat"
import { AI_MOOD, CREDITS_MODAL_COPY } from "@/lib/constants"
import MyModal from "app/components/Modal"
import { Hand } from "lucide-react"
import { useChat } from "hooks/use-chat"
import { updateApiCallsAndCredits } from "utils/helpers"

export default function Client({ session }) {
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const { setShowSignInModal } = useSignInModal({})
  const userCredits = session && session.user?.credits
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
      if (session) {
        const data = await updateApiCallsAndCredits(session.user?.id)

        if (data?.creditsLeft === 0) {
          setCreditsModaIsOpen(true)
        }
      }
    },
  })

  useEffect(() => {
    if (!userCredits || userCredits === 0) {
      setCreditsModaIsOpen(true)
    }
  }, [userCredits])

  useEffect(() => {
    if (session.user && !session.user.credits && isLoading) {
      stop()
      setCreditsModaIsOpen(true)
    }
  }, [session, stop, isLoading])

  return (
    <>
      <Header session={session} setShowSignInModal={setShowSignInModal} />
      <Chat
        setInput={setInput}
        userName={userName}
        messages={messages.slice(1)}
      />
      <InputChat
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {isLoading && (
        <div
          className="absolute top-48 right-4 h-12 w-12 cursor-pointer"
          onClick={() => stop()}
        >
          <Hand size={32} color="white" />
        </div>
      )}
      <MyModal
        title={CREDITS_MODAL_COPY.title}
        isCreditsModal
        body={CREDITS_MODAL_COPY.description}
        isOpen={creditsModaIsOpen}
        buttonText={CREDITS_MODAL_COPY.callToAction}
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
