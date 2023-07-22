"use client"

import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"

import Modal from "app/components/Modal"

import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import {
  LandElementType,
  libTestingElementType,
  TestingElementType,
} from "app/components/DropDown"
import FooterSection from "./footer-section"
import { getCodeGeniusPlaceHolder } from "utils/strings"
import { generateCode } from "utils/generateCode"
import { CombinedMessages } from "app/components/shared/CombinedMessages"
import useCodeGeniusMood from "hooks/useCodeGeniusMood"
import { usePathname, useSearchParams } from "next/navigation"
import useWindowSize from "hooks/use-window-size"

let langElements: LandElementType[] = ["Typescript", "Javascript", "Python"]
let libElements: LandElementType[] = ["React", "Vue", "Angular"]

let testFrameworkElements: TestingElementType[] = [
  "Jest",
  "AVA",
  "Vitest",
  "Cypress",
  "Mocha",
  "Jasmine",
]

let testLibElements: libTestingElementType[] = ["React Testing", "Chai"]

export default function Client({
  userName,
  chatHasStarted,
  langTranslation,
  libTranslation,
  setChatHasStarted,
  setGeneratedCode,
  generatedCode,
  translations,
  modalTranslations,
  userId,
  userCredits,
  lib,
  mode,
  setMode,
  setLib,
  langElement,
  codeSentence,
  setLangElement,
  setCodeSentence,
}) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { isMobile } = useWindowSize()
  const [testLibElement, setTestLib] =
    useState<libTestingElementType>("Testing Library")
  const [testFrameworkElement, setTestFrameworkElement] =
    useState<TestingElementType>("Testing Tool")
  const [loading, setLoading] = useState(false)
  const [modaIsOpen, setModaIsOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [docOptions, setDocOptions] = useState("Options")
  const [creditsLeft, setCreditsLeft] = useState(userCredits)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  const [userHasAResponse, setUserHasAResponse] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [questionName, setQuestionName] = useState("")
  const controller = new AbortController()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const placeHolderText = getCodeGeniusPlaceHolder(mode, translations)
  const codeGeniusMood = useCodeGeniusMood(translations)

  console.log("testFrameworkElement", testFrameworkElement)

  const codeMessages = useRef([
    {
      role: "system",
      content: "",
    },
  ])
  //SET SYSTEM MESSAGES.
  useEffect(() => {
    switch (mode) {
      case "smart":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content = `You are an AI software development assistant which is specialized in 
        providing code snippets and suggestions. ${
          langElement !== langTranslation && lib !== libTranslation
            ? "Make sure tu use " + langElement + " and " + lib + "."
            : "Make sure tu use Javascript and ReactJS."
        } If a code comment consists of more than 10 words, proceed to the subsequent line.`
        break
      case "test":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content = `You are an specialized AI software assistant with a 
        strong background in unit, integration, and e2e testing.`
        break
      case "improve":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content =
          "You are a helpful and specialized AI software assistant which is specialized in code performance and customization.  Make sure to comment on the improvements at the end, in short code comments."
        break
      case "docs":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content = `Your task as an AI software assistant, providing code documentation. 
        Requeriments: ${
          docOptions === "Inline Docs"
            ? "Make sure to document the code by outputing the same code with comments next to the code, explaining the logic."
            : "Make sure to use MDX and Markdown syntax to format the documentation."
        }.`
        break
      default:
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content =
          "You are an AI software development assistant which is specialized in providing code examples and suggestions."
        break
    }
  }, [
    langElement,
    lib,
    mode,
    testFrameworkElement,
    testLibElement,
    setMode,
    docOptions,
    langTranslation,
    libTranslation,
  ])

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("mode")
      switch (search) {
        case "smart":
          setMode("smart")
          break
        case "test":
          setMode("test")
          break
        case "improve":
          setMode("improve")
          break
        case "docs":
          setMode("docs")
          break
        default:
          setMode("smart")
      }
    }
  }, [searchParams, setMode])

  //SET USER MESSAGES.
  useEffect(() => {
    if (mode === "smart") {
      setPrompt(`${"Context: " + codeSentence + "."} `)
    }
    if (mode === "test") {
      setPrompt(
        `${
          `Generate a unit test, using this code as a context: ` +
          codeSentence +
          `. Make sure to use ${
            testFrameworkElement !== "Testing Tool"
              ? testFrameworkElement
              : "Jest"
          }. ${
            testLibElement !== "Testing Library"
              ? `Also, use ${testLibElement}.`
              : ""
          }`
        }`,
      )
    }
    if (mode === "improve") {
      setPrompt(
        `${
          "Improve and propose performance boost based on the provided context: " +
          codeSentence +
          "."
        }`,
      )
    }
    if (mode === "docs") {
      setPrompt(`${"Add documentation for this code:" + codeSentence + "."}`)
    }
  }, [codeSentence, mode, testFrameworkElement, testLibElement])

  //Clean up previous code responses
  useEffect(() => {
    if (generatedCode.length > 0 && !reader && !userHasAResponse) {
      setGeneratedCode("")
    }
  }, [generatedCode, reader, setGeneratedCode, userHasAResponse])

  useEffect(() => {
    const editorPanel = document.getElementById("code-editor")
    if (editorPanel) {
      editorPanel.focus()
    }
  }, [])

  useEffect(() => {
    if (!userCredits || userCredits === 0) {
      setCreditsModaIsOpen(true)
    }
  }, [userCredits])

  const generateCompletion = async () => {
    setLoading(true)
    setChatHasStarted(true)
    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: prompt,
      },
    ]
    console.log("codeMessages.current", codeMessages.current)

    generateCode({
      setReader,
      setGeneratedCode,
      codeMessages,
      userId,
      setUserHasAResponse,
      setCreditsLeft,
      setCreditsModaIsOpen,
      setLoading,
    })
  }

  const onCodeGeneration = () => {
    //Validate testing tools.
    if (
      !isMobile &&
      mode === "test" &&
      testFrameworkElement === "Testing Tool"
    ) {
      setModaIsOpen(true)
      return false
    }

    if (!isMobile && mode === "smart" && langElement === "Language") {
      setModaIsOpen(true)
      return false
    }

    if (!creditsLeft || creditsLeft === 0) {
      setCreditsModaIsOpen(true)
      return false
    }
    generateCompletion()
  }

  const onSaveQuestionModal = () => {
    const payload = {
      userId,
      questionName,
      prompt: generatedCode,
    }
    fetch("/api/prompt/save", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => console.log("res:", res))
  }

  const stopGeneration = async () => {
    setLoading(false)
    controller.abort()
    if (!reader) {
      return
    }
    try {
      await reader.cancel()
      // setReader(null);
    } catch (error: any) {
    } finally {
      setReader(null)
    }
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionName(event.target.value)
  }

  const clearPanel = () => {
    setChatHasStarted(false)
    setGeneratedCode("")
    setCodeSentence("")
  }

  const generatedMessages = generatedCode.split("<>").filter((i) => i !== "")

  const showUserMessage =
    mode === "smart" && chatHasStarted && codeSentence.length > 0

  return (
    <div className="w-full sm:ml-10">
      <div
        ref={chatContainerRef}
        id="container"
        className="ml-0 mt-16 flex max-h-[90vh] flex-col items-start justify-start overflow-y-scroll pb-24 sm:ml-8 sm:justify-between"
      >
        <div className="w-full">
          <div className="mx-auto  w-full border-b-[0.5px] border-gray-600 pb-1 text-left text-[13px]">
            <div className="mt-5 inline-flex font-sans">
              <span className="ml-5 text-2xl font-semibold text-white">
                {codeGeniusMood}
              </span>
            </div>
          </div>
          <Editor
            padding={20}
            textareaId="code-editor"
            placeholder={placeHolderText}
            className="max-h[500px] mb-8 w-full rounded-lg border-none bg-purple-900 pb-6 pt-4 font-mono text-gray-200 focus:border-none focus:shadow-none focus:ring-0 focus:ring-purple-700 active:border-purple-700 "
            value={codeSentence}
            highlight={(code) => highlight(code, languages.js)}
            onValueChange={(code) => setCodeSentence(code)}
          />
          {showUserMessage ? (
            <div className="mb-1 flex ">
              <div className="ml-1 flex w-full items-center justify-center">
                <div className="flex items-start justify-start">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado text-center font-medium">
                    {userName}
                  </span>
                </div>
                <div className="mx-auto ml-[6px] mr-2 w-[96%] rounded-lg bg-purple-400 p-2">
                  <p
                    style={{ borderRadius: "0px" }}
                    className="ml-2 text-left leading-7 text-white"
                  >
                    {codeSentence}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          {generatedMessages && (
            <CombinedMessages
              pathName={pathName}
              loading={loading}
              userName={userName}
              generatedMessages={generatedMessages}
            />
          )}
        </div>
      </div>
      <FooterSection
        translations={translations.footer}
        stopGeneration={stopGeneration}
        clearPanel={clearPanel}
        testFrameworkElements={testFrameworkElements}
        setDocOptions={setDocOptions}
        docOptions={docOptions}
        testLibElements={testLibElements}
        testLibElement={testLibElement}
        setTestLib={setTestLib}
        setTestFrameworkElement={setTestFrameworkElement}
        testFrameworkElement={testFrameworkElement}
        mode={mode}
        setUserHasAResponse={setUserHasAResponse}
        generatedCode={generatedCode}
        langElement={langElement}
        libElements={libElements}
        langElements={langElements}
        loading={loading}
        setLangElement={setLangElement}
        lib={lib}
        setLib={setLib}
        onCodeGeneration={onCodeGeneration}
      />
      <Modal
        title={modalTranslations?.title}
        isCreditsModal
        body={modalTranslations?.description}
        isOpen={creditsModaIsOpen}
        buttonText={modalTranslations?.cta}
        buttonLink="/pricing"
        setIsOpen={setCreditsModaIsOpen}
      />
      <Modal
        isCreditsModal
        title={`Configure your ${
          mode === "smart" ? "programming languages" : "testing tools"
        }`}
        body={`${
          mode === "smart"
            ? " You have the option to select programming languages, and if desired, a UI library, to help give you a better suggestion. Use the dropdown menus located in the bottom left corner."
            : "You have the option to select a testing framework and, if desired, a testing library. Use the dropdown menus located in the bottom left corner."
        }`}
        isOpen={modaIsOpen}
        buttonText="Got it"
        setIsOpen={setModaIsOpen}
      />
      <Modal
        savePropmptName
        isPromptModal
        body="What should we call this question?"
        onSave={onSaveQuestionModal}
        isOpen={showSavePromptModal}
        propmptName={questionName}
        handleInputChange={handleInputChange}
        buttonText="Save"
        setIsOpen={setShowSavePromptModal}
      />
    </div>
  )
}
