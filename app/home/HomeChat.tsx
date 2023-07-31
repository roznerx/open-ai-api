"use client"

import React, { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

import useWindowSize from "hooks/use-window-size"

import HomeChatInput from "./HomeChatInput"

const Modal = dynamic(() => import("app/components/Modal"), {
  loading: () => null,
})

export default function HomeChat({ session, translations }) {
  const textareaRef = useRef<any>(null)

  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (textareaRef && textareaRef.current && !isMobile) {
      textareaRef.current.focus()
    }
  }, [isMobile])

  // useEffect(() => {
  //   if (!session && userApiCalls >= 10 && isLoading) {
  //     stop()
  //     setShowSignInModal(true)
  //   }
  // }, [userApiCalls, session, stop, isLoading, setShowSignInModal])

  // useEffect(() => {
  //   if (session?.user && !session?.user?.credits) {
  //     setCreditsModaIsOpen(true)
  //   }
  // }, [session])

  return (
    <>
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
        <div className="relative mt-2 h-12 w-full text-center sm:w-[900px]">
          <HomeChatInput
            textareaRef={textareaRef}
            translations={translations}
          />
        </div>
        {/* <Modal
          title={creditsModalTranslations?.title}
          isCreditsModal
          body={creditsModalTranslations?.description}
          isOpen={creditsModaIsOpen}
          buttonText={creditsModalTranslations?.cta}
          buttonLink="/pricing"
          setIsOpen={setCreditsModaIsOpen}
        /> */}
      </div>
    </>
  )
}
