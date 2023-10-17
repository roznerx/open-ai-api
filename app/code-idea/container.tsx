"use client"

import { useState } from "react"
import Client from "./client"
import { LandElementType } from "app/components/DropDown"

export type ModeTypes = "smart" | "test" | "improve" | "docs"

export default function Container({ session, translations }) {
  const [chatHasStarted, setChatHasStarted] = useState(false)
  const [mode, setMode] = useState<ModeTypes>("smart")

  const [generatedCode, setGeneratedCode] = useState<String>("")
  const [codeSentence, setCodeSentence] = useState("")
  const [langElement, setLangElement] = useState<LandElementType>(
    translations.codeIdea.footer.lang,
  )
  const [lib, setLib] = useState<LandElementType>(
    translations.codeIdea.footer.lib,
  )

  const userId = session && session.user?.id
  const userCredits = session && session.user?.credits

  return (
    <>
      <Client
        isPremium={session?.user?.isPremium}
        userName={session?.user?.name?.substring(0, 1)}
        rootTranslations={translations}
        translations={translations?.codeIdea}
        langTranslation={translations.codeIdea.footer.lang}
        libTranslation={translations.codeIdea.footer.lib}
        modalTranslations={translations?.modals?.moreCredits}
        setGeneratedCode={setGeneratedCode}
        generatedCode={generatedCode}
        chatHasStarted={chatHasStarted}
        setChatHasStarted={setChatHasStarted}
        userCredits={userCredits}
        userId={userId}
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
