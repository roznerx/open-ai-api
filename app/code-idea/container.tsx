"use client"

import { useState } from "react"
import Client from "./client"
import { LandElementType } from "app/components/DropDown"
import { ProModal } from "app/components/modals/ProModal"
import "./code-idea.css"

export type ModeTypes = "smart" | "test" | "improve" | "docs"

export default function Container({ session, translations, prismaUser }) {
  const [chatHasStarted, setChatHasStarted] = useState(false)
  const [mode, setMode] = useState<ModeTypes>("smart")
  const [premiumModalIsOpen, setPremiumModalIsOpen] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const [codeSentence, setCodeSentence] = useState("")
  const [langElement, setLangElement] = useState<LandElementType>(
    translations.codeIdea.footer.lang,
  )
  const [lib, setLib] = useState<LandElementType>(
    translations.codeIdea.footer.lib,
  )

  return (
    <>
      <ProModal
        mode={mode}
        translations={translations.pricing}
        showModal={premiumModalIsOpen}
        setShowModal={setPremiumModalIsOpen}
      />
      <Client
        setPremiumModalIsOpen={setPremiumModalIsOpen}
        isPremium={prismaUser.isPremium}
        userName={session?.user?.name?.substring(0, 1)}
        translations={translations?.codeIdea}
        langTranslation={translations.codeIdea.footer.lang}
        libTranslation={translations.codeIdea.footer.lib}
        setGeneratedCode={setGeneratedCode}
        generatedCode={generatedCode}
        chatHasStarted={chatHasStarted}
        setChatHasStarted={setChatHasStarted}
        userId={session?.user?.id}
        mode={mode}
        setMode={setMode}
        setLib={setLib}
        lib={lib}
        langElement={langElement}
        setLangElement={setLangElement}
        codeSentence={codeSentence}
        setCodeSentence={setCodeSentence}
      />
    </>
  )
}
