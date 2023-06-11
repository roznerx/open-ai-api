"use client"

import { useEffect, useState } from "react"
import Client from "./client"
import Navigation from "./navigation"
import {
  LandElementType,
  libTestingElementType,
  TestingElementType,
} from "app/components/DropDown"
import { useSearchParams } from "next/navigation"
import { useSignInModal } from "app/components/modals/SignInModal"
import Header from "app/components/Header"

export type ModeTypes = "smart" | "test" | "improve" | "docs"

export default function Container({ session }) {
  const [smartSelected, setSmartSelected] = useState(true)
  const { setShowSignInModal } = useSignInModal({})
  const [openSecondayNavBar, setOpenSecondaryNavBar] = useState(false)
  const [chatHasStarted, setChatHasStarted] = useState(false)
  const [testSelected, setTestSelected] = useState(false)
  const [improveSelected, setImproveSelected] = useState(false)
  const [bugSelected] = useState(false)
  const [mode, setMode] = useState<ModeTypes>("smart")
  const [docSelected, setDocSelected] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const [codeSentence, setCodeSentence] = useState("")
  const [langElement, setLangElement] = useState<LandElementType>("Language")
  const [testFrameworkElement, setTestFrameworkElement] =
    useState<TestingElementType>("Testing Tool")
  const [testLibElement, setTestLib] =
    useState<libTestingElementType>("Testing Lib")
  const [lib, setLib] = useState<LandElementType>("UI Library")
  const searchParams = useSearchParams()
  const userId = session && session.user?.id
  const userCredits = session && session.user?.credits

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("mode")

      if (smartSelected || search === "smart") {
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
        setSmartSelected(true)
      }
      if (testSelected || search === "test") {
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
        setTestSelected(true)
      }
      if (improveSelected || search === "improve") {
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
        setImproveSelected(true)
      }
      if (docSelected || search === "docs") {
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
        setDocSelected(true)
      }
    }
  }, [
    searchParams,
    smartSelected,
    testSelected,
    bugSelected,
    docSelected,
    codeSentence,
    improveSelected,
    langElement,
    lib,
    testFrameworkElement,
    testLibElement,
    chatHasStarted,
  ])

  return (
    <>
      <Header session={session} setShowSignInModal={setShowSignInModal} />
      <Navigation
        mode={mode}
        setGeneratedCode={setGeneratedCode}
        setMode={setMode}
        setOpenSecondaryNavBar={setOpenSecondaryNavBar}
        openSecondayNavBar={openSecondayNavBar}
        improveSelected={improveSelected}
        setImproveSelected={setImproveSelected}
        smartSelected={smartSelected}
        testSelected={testSelected}
        docSelected={docSelected}
        setDocSelected={setDocSelected}
        setSmartSelected={setSmartSelected}
        setTestSelected={setTestSelected}
      />
      <Client
        userName={session?.user?.name?.substring(0, 1)}
        setGeneratedCode={setGeneratedCode}
        generatedCode={generatedCode}
        chatHasStarted={chatHasStarted}
        setChatHasStarted={setChatHasStarted}
        testLibElement={testLibElement}
        setTestLib={setTestLib}
        userCredits={userCredits}
        userId={userId}
        mode={mode}
        setMode={setMode}
        setTestFrameworkElement={setTestFrameworkElement}
        testFrameworkElement={testFrameworkElement}
        setLib={setLib}
        lib={lib}
        langElement={langElement}
        setLangElement={setLangElement}
        improveSelected={improveSelected}
        docSelected={docSelected}
        smartSelected={smartSelected}
        testSelected={testSelected}
        prompt={prompt}
        codeSentence={codeSentence}
        setCodeSentence={setCodeSentence}
      />
    </>
  )
}
