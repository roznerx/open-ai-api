"use client"

import { useEffect, useState } from "react"
import Client from "./client"
import Navigation from "./navigation"
import { LandElementType } from "app/components/DropDown"
import { useSearchParams } from "next/navigation"
import { useSignInModal } from "app/components/modals/SignInModal"
import Header from "app/components/Header"

export type ModeTypes = "smart" | "test" | "improve" | "docs"

export default function Container({ session }) {
  const { setShowSignInModal } = useSignInModal({})
  const [chatHasStarted, setChatHasStarted] = useState(false)
  const [mode, setMode] = useState<ModeTypes>("smart")
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const [codeSentence, setCodeSentence] = useState("")
  const [langElement, setLangElement] = useState<LandElementType>("Language")
  const [lib, setLib] = useState<LandElementType>("UI Library")
  const searchParams = useSearchParams()
  const userId = session && session.user?.id
  const userCredits = session && session.user?.credits

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("mode")

      if (search === "smart") {
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Context: " +
                codeSentence +
                ". Ensure that if a code comment consists of more than 10 words, proceed to the subsequent line."
          } `,
        )
        setMode("smart")
      }
      if (search === "test") {
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Generate a unit test and listen for the user's feedback, context: " +
                codeSentence +
                "."
          }`,
        )
        setMode("test")
      }
      if (search === "improve") {
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Improve and propose performance boost based on the provided context: " +
                codeSentence +
                ". Make sure to comment on the improvements at the end, in short code comments."
          }`,
        )
        setMode("improve")
      }
      if (search === "docs") {
        setPrompt(
          `${
            chatHasStarted
              ? codeSentence
              : "Create code documentation for the provided context:" +
                codeSentence +
                "."
          }`,
        )
        setMode("docs")
      }
    }
  }, [searchParams, codeSentence, langElement, lib, chatHasStarted])

  return (
    <>
      <Header session={session} setShowSignInModal={setShowSignInModal} />
      <Navigation mode={mode} />
      <Client
        userName={session?.user?.name?.substring(0, 1)}
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
        prompt={prompt}
        codeSentence={codeSentence}
        setCodeSentence={setCodeSentence}
      />
    </>
  )
}
