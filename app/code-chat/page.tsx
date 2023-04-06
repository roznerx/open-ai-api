"use client"

import { ChangeEvent, KeyboardEvent, useState } from "react"
import { StopButton } from "app/components/Button"
import Modal from "app/components/Modal"
import useLocalStorage from "hooks/use-localstorage"
import { useRef } from "react"
import { LSConfig } from "@/lib/constants"
import Chat from "app/components/shared/Chat"

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [codeSentence, setCodeSentence] = useState("")
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const [modaIsOpen, setModaIsOpen] = useState(false)
  const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  const [questionName, setQuestionName] = useState("")
  const [userId] = useLocalStorage(LSConfig.user.userId, "")
  const controller = new AbortController()
  const codeMessages = useRef([
    {
      role: "system",
      content:
        "You are a robust and cleaver programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
    },
  ])

  const onArrowPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: codeSentence,
      },
    ]
    setCodeSentence("")
    generateCode()
  }

  const onCodeGeneration = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (codeSentence.length === 0 || codeSentence === "") {
      return false
    }
    if (e.key === "Enter") {
      codeMessages.current = [
        ...codeMessages.current,
        {
          role: "user",
          content: codeSentence,
        },
      ]
      setCodeSentence("")
      generateCode()
    }
  }

  const generateCode = async () => {
    setLoading(true)

    const response = await fetch("/api/generateWithTurbo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...codeMessages.current],
      }),
    })

    // console.log("response", response);
    // clear timeout
    // clearTimeout(id)

    if (!response.ok) {
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

    try {
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading

        let chunkValue = decoder.decode(value)

        setGeneratedCode((prev) => prev + chunkValue)
        if (done) {
          setGeneratedCode((prev) => prev + "<>")
          setLoading(false)
        }
      }
    } catch (error) {
      return `There was an error with your request ${error}`
    } finally {
      setLoading(false)
      setReader(null)
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
    } catch (error: any) {
    } finally {
      setReader(null)
    }
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionName(event.target.value)
  }
  const generatedMessages = generatedCode.split("<>").filter((i) => i !== "")

  return (
    <>
      <Modal
        body="Our servers are taking longer than expected. We suggest
        rewording your instruction or input to get a faster result."
        isOpen={modaIsOpen}
        buttonText="Ok"
        setIsOpen={setModaIsOpen}
      />
      <Modal
        body="What should we call this question?"
        onSave={onSaveQuestionModal}
        isOpen={showSavePromptModal}
        propmptName={questionName}
        handleInputChange={handleInputChange}
        savePropmptName
        buttonText="Save"
        setIsOpen={setShowSavePromptModal}
      />
      <main className="flex w-full min-w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <div className="w-[85%] text-white dark:text-white">
          {/* TITLE */}
          <h1 className="font-bold text-5xl mb-16">What do you want to accomplish?</h1>
          {/* FEATURES BOXES */}
          <div className="flex flex-row justify-between">
            {/* LEFT BOX */}
            <div className="w-[357px] h-[332px] bg-purple-400 flex flex-col py-[40px] px-[30px] text-left rounded-[20px]">
              <div className="w-full h-1/3">
                <div className="w-[50px] h-[50px] bg-mint rounded-full"></div>
              </div>
              <div className="w-full h-1/3">
                <h4 className="font-bold text-2xl leading-8">Code completion and suggestions</h4>
              </div>
              <div className="w-full h-1/3">
                <h6 className="font-normal text-[16px] leading-6">
                  Use AI to suggest code snippets or complete code statements as the user types, 
                  based on previous code patterns and common coding practices.
                </h6>
              </div>
            </div>
            {/* CENTER BOX */}
            <div className="w-[357px] h-[332px] bg-purple-400 flex flex-col py-[40px] px-[30px] text-left rounded-[20px]">
              <div className="w-full h-1/3">
                <div className="w-[50px] h-[50px] bg-mint rounded-full"></div>
              </div>
              <div className="w-full h-1/3">
                <h4 className="font-bold text-2xl leading-8">Bug detection and correction</h4>
              </div>
              <div className="w-full h-1/3">
                <h6 className="font-normal text-[16px] leading-6">
                  Use AI to detect and suggest corrections for common coding mistakes, 
                  such as syntax errors, undefined variables, or null references.
                </h6>
              </div>
            </div>
            {/* RIGHT BOX */}
            <div className="w-[357px] h-[332px] bg-purple-400 flex flex-col py-[40px] px-[30px] text-left rounded-[20px]">
              <div className="w-full h-1/3">
                <div className="w-[50px] h-[50px] bg-mint rounded-full"></div>
              </div>
              <div className="w-full h-1/3">
                <h4 className="font-bold text-2xl leading-8">Test Code</h4>
              </div>
              <div className="w-full h-1/3">
                <h6 className="font-normal text-[16px] leading-6">
                  Identify the different scenarios and inputs that need to be tested for 
                  the code, and develop test cases that can evaluate the code's performance.
                </h6>
              </div>
            </div>
          </div>
          {/* BLANK SQUARES */}
          <div className="flex flex-row justify-between w-full gap-[20px] p-8 mt-8">
            <div className="w-[261px] h-[214px] bg-white rounded-[10px]"></div>
            <div className="w-[261px] h-[214px] bg-white rounded-[10px]"></div>
            <div className="w-[261px] h-[214px] bg-white rounded-[10px]"></div>
            <div className="w-[261px] h-[214px] bg-white rounded-[10px]"></div>
          </div>
          <Chat
            generatedResponse={generatedMessages}
            onArrowPress={onArrowPress}
            codeSentence={codeSentence}
            onCodeGeneration={onCodeGeneration}
            setCodeSentence={setCodeSentence}
            useArrow
          />
          <StopButton
            onClick={stopGeneration}
            loading={loading}
            text="Stop Generating"
          />
        </div>
      </main>
    </>
  )
}
