"use client"

import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"

import Modal from "app/components/Modal"
import tailwindConfig from "tailwind.config.js"
import GenerateCode from "app/components/GenerateCode"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { ElementType } from "app/components/DropDown"
import FooterSection from "./footer-section"
import { fetchWithTurbo } from "utils/generateCode"
import { getCodeGeniusPlaceHolder } from "utils/strings"
import { updateApiCallsAndCredits } from "utils/helpers"
import { CREDITS_MODAL_COPY } from "@/lib/constants"

let libElements: ElementType[] = ["React", "Vue", "Angular"]
let langElements: ElementType[] = ["Typescript", "Javascript"]

const colors: any = tailwindConfig.theme?.extend?.colors

export default function Client({
  userId,
  userCredits,
  lib,
  mode,
  prompt,
  setLib,
  langElement,
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
  const [creditsLeft, setCreditsLeft] = useState(userCredits)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [questionName, setQuestionName] = useState("")
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const controller = new AbortController()
  const [scrollHeight, setScrollHeight] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef && chatContainerRef.current) {
      setScrollHeight(chatContainerRef.current?.scrollHeight)
      chatContainerRef.current?.scrollTo({
        top: scrollHeight - chatContainerRef.current.offsetHeight,
        behavior: "smooth",
      })
    }
  }, [chatContainerRef, chatContainerRef?.current?.scrollHeight, scrollHeight])

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

  const onCodeGeneration = () => {
    if (!creditsLeft || creditsLeft === 0) {
      setCreditsModaIsOpen(true)
      return false
    }
    generateCode()
  }

  const generateCode = async () => {
    setLoading(true)
    let response: any
    // const id = setTimeout(() => {
    //   controller.abort()
    //   setLoading(false)
    //   setModaIsOpen(true)
    //   // setCodeSentence("");
    // }, promptResponseTimeout)

    setGeneratedCode("")

    if (testSelected) {
      response = await fetchWithTurbo(
        "You are a helpful and specialized AI software assistant with experience in unit testing, e2e testing. Requeriments: Write tests using the Jest and React Testing Library when possible.",
        prompt,
      )
    } else if (improveSelected) {
      response = await fetchWithTurbo(
        "You are a helpful and specialized AI software assistant which is specialized in code performance and customization.",
        prompt,
      )
    } else if (docSelected) {
      response = await fetchWithTurbo(
        "You are an AI software assistant which is specialized in providing code documentation. Requeriments: Use short sentences to make it easy to read (max 20 words per line).",
        prompt,
      )
    } else {
      //Smart
      response = await fetchWithTurbo(
        "You are an AI software development assistant which is specialized in providing code ideas/suggestions.",
        prompt,
      )
    }

    // console.log("response", response);
    // clear timeout
    // clearTimeout(id)

    if (response && !response.ok) {
      setLoading(false)
      return
    }

    // This data is a ReadableStream
    const data = response.body

    if (!data) {
      setLoading(false)
      return
    }

    const reader = data.getReader()
    setReader(reader)
    const decoder = new TextDecoder()
    let done = false
    let tokensCount = 0
    try {
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        tokensCount++
        let chunkValue = decoder.decode(value)
        // if (
        //   chunkValue.match(/```/) ||
        //   chunkValue.match(/``/) ||
        //   chunkValue.match(/`/)
        // )
        //   chunkValue = ""
        setGeneratedCode((prev) => prev + chunkValue)
      }
    } catch (error) {
      return `There was an error with your request ${error}`
    } finally {
      setLoading(false)
      setReader(null)
      //✨ Make some credits update Magic ✨
      const data = await updateApiCallsAndCredits(userId, tokensCount)

      if (data?.creditsLeft === 0) {
        setCreditsLeft(0)
        setCreditsModaIsOpen(true)
      }
      //RESET TOKENS COUNT.
      tokensCount = 0
    }
    if (done) {
      setLoading(false)
    }
  }

  const onSaveCode = () => {
    setShowSavePromptModal(true)
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

  function getCodeGeniusMode() {
    if (smartSelected && mode !== "test") {
      return (
        <div className="inline-flex font-sans">
          <span className="ml-5  text-2xl font-semibold text-white">
            Smart suggestions
          </span>{" "}
        </div>
      )
    } else if (testSelected || mode === "test") {
      return (
        <div className="inline-flex font-sans">
          <span className="ml-5  text-2xl font-semibold text-white">
            Test generation
          </span>{" "}
        </div>
      )
    } else if (improveSelected) {
      return (
        <div className="inline-flex font-sans">
          <span className="ml-5  text-2xl font-semibold text-white">
            Improvements mode
          </span>{" "}
        </div>
      )
    } else if (docSelected) {
      return (
        <div className="inline-flex font-sans">
          <span className="ml-5  text-2xl font-semibold text-white">
            Documentation mode
          </span>{" "}
        </div>
      )
    }
  }

  const placeHolderText = getCodeGeniusPlaceHolder(mode)
  return (
    <div className="w-full sm:ml-10">
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
      <div
        ref={chatContainerRef}
        id="container"
        className="ml-0 mt-16 flex max-h-[90vh] flex-col items-start justify-start overflow-y-scroll sm:ml-8 sm:justify-between"
      >
        <div className="w-full">
          <div className="sm:text-1xl  mx-auto w-full border-b-[1px] border-gray-400  text-left text-[13px]  ">
            {getCodeGeniusMode()}
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
          {generatedCode && (
            <GenerateCode
              onSaveCode={onSaveCode}
              langElement={langElement}
              generatedCode={generatedCode}
            />
          )}
        </div>
      </div>
      <FooterSection
        mode={mode}
        generatedCode={generatedCode}
        onSaveCode={onSaveCode}
        langElement={langElement}
        libElements={libElements}
        langElements={langElements}
        loading={loading}
        setLangElement={setLangElement}
        lib={lib}
        setLib={setLib}
        onCodeGeneration={onCodeGeneration}
      />
    </div>
  )
}
