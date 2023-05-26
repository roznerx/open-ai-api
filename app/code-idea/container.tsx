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
  const [testSelected, setTestSelected] = useState(false)
  const [improveSelected, setImproveSelected] = useState(false)
  const [bugSelected] = useState(false)
  const [mode, setMode] = useState<ModeTypes>("smart")
  const [docSelected, setDocSelected] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [codeSentence, setCodeSentence] = useState("")
  const [langElement, setLangElement] = useState<LandElementType>("Typescript")
  const [testFrameworkElement, setTestFrameworkElement] =
    useState<TestingElementType>("Jest")
  const [testLibElement, setTestLib] =
    useState<libTestingElementType>("React Testing")
  const [lib, setLib] = useState<LandElementType>("React")
  const searchParams = useSearchParams()
  const userId = session && session.user?.id
  const userCredits = session && session.user?.credits

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("mode")

      if (smartSelected || search === "smart") {
        setPrompt(
          `Make sure to use this context: ${codeSentence}${
            codeSentence.slice(-1) === "." ? "" : "."
          }  Make sure to prefix all code explanations with "//" so it can be read as code comments. Never add code comments at the end of the line. If a comment has more than 10 words, continue in the next line. Last but not least, only reply with code, without additional explanations.`,
        )
        setMode("smart")
      }
      if (testSelected || search === "test") {
        setPrompt(`User context: "${codeSentence}".`)
        setMode("test")
      }
      if (bugSelected) {
        setPrompt(
          `Improve and propose performance boost based on the provided code: \`${codeSentence}\`. Make sure to comment on the improvements at the end, in short code comments.`,
        )
      }
      if (improveSelected || search === "improve") {
        setPrompt(
          `Improve and propose performance boost based on the provided code: \`${codeSentence}\`. Make sure to comment on the improvements at the end, in short code comments.`,
        )
        setMode("improve")
      }
      if (docSelected || search === "docs") {
        setPrompt(
          `Create documentation for the provided code: "${codeSentence}". Document the code as code comments. Don't use long sentences`,
        )
        setMode("docs")
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
  ])

  return (
    <>
      <Header session={session} setShowSignInModal={setShowSignInModal} />
      <Navigation
        mode={mode}
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
        testLibElement={testLibElement}
        setTestLib={setTestLib}
        userCredits={userCredits}
        userId={userId}
        mode={mode}
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
