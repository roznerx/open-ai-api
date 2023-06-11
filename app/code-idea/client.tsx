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
import { CREDITS_MODAL_COPY } from "@/lib/constants"
import { generateCodeCompletion } from "utils/generateCode"
import { getCodeGeniusMode } from "utils/placeholder"
import { CombinedMessages } from "app/components/shared/CombinedMessages"

let langElements: LandElementType[] = ["Typescript", "Javascript", "Python"]
let libElements: LandElementType[] = ["React", "Vue", "Angular"]

let testFrameworkElements: TestingElementType[] = [
  "Jest",
  "Cypress",
  "Mocha",
  "Jasmine",
]

let testLibElements: libTestingElementType[] = ["React Testing", "Chai"]

export default function Client({
  userImage,
  setChatHasStarted,
  setGeneratedCode,
  generatedCode,
  testFrameworkElement,
  setTestLib,
  setTestFrameworkElement,
  userId,
  userCredits,
  lib,
  mode,
  setMode,
  prompt,
  setLib,
  langElement,
  testLibElement,
  codeSentence,
  testSelected,
  smartSelected,
  docSelected,
  setLangElement,
  setCodeSentence,
  improveSelected,
}) {
  const [loading, setLoading] = useState(false)
  const [modaIsOpen, setModaIsOpen] = useState(false)
  const [readyToGenerate, setReadyToGenerate] = useState(true)
  const [userMessages, setUserMessages] = useState<any>("")
  const [creditsLeft, setCreditsLeft] = useState(userCredits)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [questionName, setQuestionName] = useState("")

  const controller = new AbortController()

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const placeHolderText = getCodeGeniusPlaceHolder(mode)

  // const searchParams = useSearchParams()

  // useEffect(() => {
  //   if (searchParams) {
  //     const framework = searchParams.get("framework")

  //     setTestFrameworkElement(framework)
  //   }
  // }, [searchParams, setTestFrameworkElement])

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
        providing code exaamples and suggestions. ${
          langElement && lib
            ? "Make sure tu use " + langElement + " and " + lib + "."
            : ""
        }`
        break
      case "test":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content = `You are an specialized AI software assistant with a lot of background in unit testing, integration testing and e2e testing. 
        Make sure tu use  ${
          testFrameworkElement === "Cypress"
            ? testFrameworkElement + " as the test framework"
            : testFrameworkElement + " and " + testLibElement
        }.`
        break
      case "improve":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content =
          "You are a helpful and specialized AI software assistant which is specialized in code performance and customization."
        break
      case "docs":
        codeMessages.current = [
          {
            role: "system",
            content: "",
          },
        ]
        codeMessages.current[0].content = `You are an AI software assistant which is specialized in providing code documentation.
          Make sure to use format docs using MDX syntax. Don't output code.`
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
    console.log("codeMessages.current: ", codeMessages.current)
  }, [langElement, lib, mode, testFrameworkElement, testLibElement, setMode])

  //SET Ready to Generate when in testing mode.
  useEffect(() => {
    if (
      mode === "test" &&
      testFrameworkElement === "Testing Tool" &&
      testLibElement === "Testing Library"
    ) {
      setReadyToGenerate(false)
    }
  }, [testLibElement, testFrameworkElement, mode])

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

  const addMessage = (message, type) => {
    const newMessage = { message, type }
    if (type === "User") {
      setUserMessages((prev) => [...prev, newMessage])
    } else {
      setUserMessages((prev) => {
        const lastIndex = prev.findIndex((msg) => msg.type === "AI")

        if (lastIndex !== -1) {
          const updatedMessage = {
            ...prev[lastIndex],
            message: generatedCode,
          }

          return [
            ...prev.slice(0, lastIndex),
            updatedMessage,
            ...prev.slice(lastIndex + 1),
          ]
        }

        return [...prev, newMessage]
      })
    }
  }

  useEffect(() => {
    // User messages
    if (loading) {
      addMessage(codeSentence, "User")
    }
  }, [codeSentence, loading, setUserMessages])

  useEffect(() => {
    // AI messages
    if (loading && generatedCode.length > 0) {
      addMessage(generatedCode, "AI")
    }
  }, [
    codeSentence,
    generatedCode,
    generatedCode.length,
    loading,
    setUserMessages,
  ])

  const generateCompletion = async () => {
    setLoading(true)

    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: prompt,
      },
    ]

    generateCodeCompletion(
      setReader,
      setGeneratedCode,
      codeMessages,
      userId,
      setCreditsLeft,
      setCreditsModaIsOpen,
      setLoading,
    )
  }

  const onCodeGeneration = () => {
    if (!readyToGenerate) {
      return false
    }
    setChatHasStarted(true)
    if (!creditsLeft || creditsLeft === 0) {
      setCreditsModaIsOpen(true)
      return false
    }
    generateCompletion()
  }
  // const onSaveCode = () => {
  //   setShowSavePromptModal(true)
  // }

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

  const placeholders = getCodeGeniusMode(
    smartSelected,
    mode,
    improveSelected,
    testSelected,
    docSelected,
  )

  const stopGeneration = async () => {
    setLoading(false)
    controller.abort()
    if (!reader) {
      return
    }
    try {
      await reader.cancel()
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
    setMode(mode)
  }
  // const userdMessages = userMessage.split("||").filter((i) => i !== "")
  console.log("userMessages:", userMessages)

  // console.log("generatedCode:", generatedCode)

  // const otherMessages =
  //   userdMessages.length > 0 &&
  //   userdMessages.map((message, idx) => {
  //     return (
  //       <div key={idx} className="mb-1 flex w-[80%]">
  //         <div className="ml-6 flex items-center justify-center rounded-full ">
  //           {userImage && (
  //             <Image
  //               alt="User Picture"
  //               className="rounded-full bg-black"
  //               src={userImage}
  //               width={32}
  //               height={32}
  //             />
  //           )}
  //         </div>
  //         <div className={`mx-auto ml-3 w-full rounded-lg bg-purple-400 p-2`}>
  //           <p className={`ml-2 text-left leading-7 text-white`}>{message}</p>
  //         </div>
  //       </div>
  //     )
  //   })

  // console.log("generatedMessages:", generatedMessages)

  return (
    <div className="w-full sm:ml-10">
      <div
        ref={chatContainerRef}
        id="container"
        className="ml-0 mt-16 flex max-h-[90vh] flex-col items-start justify-start overflow-y-scroll pb-24 sm:ml-8 sm:justify-between"
      >
        <div className="w-full">
          <div className="mx-auto  w-full border-b-[0.5px] border-gray-600 pb-1 text-left text-[13px]">
            {placeholders}
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

          {userMessages && <CombinedMessages combinedMessages={userMessages} />}
        </div>
      </div>
      <FooterSection
        stopGeneration={stopGeneration}
        clearPanel={clearPanel}
        testFrameworkElements={testFrameworkElements}
        testLibElements={testLibElements}
        testLibElement={testLibElement}
        setTestLib={setTestLib}
        setTestFrameworkElement={setTestFrameworkElement}
        testFrameworkElement={testFrameworkElement}
        mode={mode}
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
        title={CREDITS_MODAL_COPY.title}
        isCreditsModal
        body={CREDITS_MODAL_COPY.description}
        isOpen={creditsModaIsOpen}
        buttonText={CREDITS_MODAL_COPY.callToAction}
        buttonLink="/pricing"
        setIsOpen={setCreditsModaIsOpen}
      />
      <Modal
        body="Our servers are taking longer than expected. We suggest
        rewording your instruction or input to get a faster result."
        isOpen={modaIsOpen}
        buttonText="Ok"
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
