"use client"

import { useEffect, useState } from "react"
import Client from "./client"
import Navigation from "./navigation"
import { LandElementType } from "app/components/DropDown"
import { useSearchParams } from "next/navigation"
import { useSignInModal } from "app/components/modals/SignInModal"
import Header from "app/components/Header"

export type ModeTypes = "smart" | "test" | "improve" | "docs"

export default function Container({ session, translations }) {
  const { setShowSignInModal } = useSignInModal({ translations })
  const [chatHasStarted, setChatHasStarted] = useState(false)
  const [mode, setMode] = useState<ModeTypes>("smart")
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const [codeSentence, setCodeSentence] = useState("")
  const [langElement, setLangElement] = useState<LandElementType>(
    translations.codeIdea.footer.lang,
  )
  const [lib, setLib] = useState<LandElementType>(
    translations.codeIdea.footer.lib,
  )
  const searchParams = useSearchParams()
  const userId = session && session.user?.id
  const userCredits = session && session.user?.credits
  console.log("translations", translations)

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("mode")

      if (search === "smart") {
        setMode("smart")
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Context: " +
                codeSentence +
                ". Ensure that if a code comment consists of more than 10 words, proceed to the subsequent line."
          } `,
        )
      }
      if (search === "test") {
        setMode("test")
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Generate a unit test and listen for the user's feedback, context: " +
                codeSentence +
                "."
          }`,
        )
      }
      if (search === "improve") {
        setMode("improve")
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Improve and propose performance boost based on the provided context: " +
                codeSentence +
                ". Make sure to comment on the improvements at the end, in short code comments."
          }`,
        )
      }
      if (search === "docs") {
        setMode("docs")
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Add documentation for this code:" + codeSentence + "."
          }`,
        )
      }
    }
  }, [searchParams, codeSentence, langElement, lib, chatHasStarted])

  return (
    <>
      <Header
        session={session}
        translations={translations.home.header}
        setShowSignInModal={setShowSignInModal}
      />
      <Navigation
        menuTranslations={translations.home.header.menu}
        translations={translations.sidebar}
        setGeneratedCode={setGeneratedCode}
        mode={mode}
      />
      <Client
        userName={session?.user?.name?.substring(0, 1)}
        translations={translations?.codeIdea}
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
