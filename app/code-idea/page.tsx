"use client"

import DropDown, { ElementType } from "app/components/DropDown"
import { ChangeEvent, SetStateAction, useState } from "react"
import ResizablePanel from "app/components/ResizablePanel"
import Button, { StopButton } from "app/components/Button"
import { HomeIcon, CodeIcon, Codepen, MessageCircleIcon } from "lucide-react"
import BulletPoint from "app/components/BulletPoint"
import GenerateCode from "app/components/GenerateCode"
import Modal from "app/components/Modal"
import useLocalStorage from "hooks/use-localstorage"
import { AnimatePresence, motion } from "framer-motion"
import { LSConfig, promptResponseTimeout } from "@/lib/constants"
import SideBar from "app/components/shared/SideBar"

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [modaIsOpen, setModaIsOpen] = useState(false)
  const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [codeSentence, setCodeSentence] = useState("")
  const [questionName, setQuestionName] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [langElement, setLangElement] = useState<ElementType>("Typescript")
  const [lib, setLib] = useState<ElementType>("React")
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const [userId] = useLocalStorage(LSConfig.user.userId, "")
  const controller = new AbortController()

  // console.log("userId", userId);

  let libElements: ElementType[] = ["React", "Vue", "Angular"]
  let langElements: ElementType[] = ["Typescript", "Javascript"]

  // Requirements: As the forth step, make sure to code comment on the folder and file structure.
  const prompt = `Generate code written in ${langElement} and ${lib}, clearly labeled "**::", "// 1.", "// 2.", "// 3." and "// 4.". 
   Context: ${codeSentence}${
    codeSentence.slice(-1) === "." ? "" : "."
  } Make sure to export default the Application component in the last step`

  const onCodeGeneration = () => {
    generateCode()
  }

  const generateCode = async () => {
    setLoading(true)

    const id = setTimeout(() => {
      controller.abort()
      setLoading(false)
      setModaIsOpen(true)
      // setCodeSentence("");
    }, promptResponseTimeout)

    setGeneratedCode("")

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })

    // console.log("response", response);
    // clear timeout
    clearTimeout(id)

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
        // console.log("🚀 - value:", value);
        done = doneReading

        let chunkValue = decoder.decode(value)
        if (
          chunkValue.match(/```/) ||
          chunkValue.match(/``/) ||
          chunkValue.match(/`/)
        )
          chunkValue = ""
        setGeneratedCode((prev) => prev + chunkValue)
      }
    } catch (error) {
      return `There was an error with your request ${error}`
    } finally {
      setLoading(false)
      setReader(null)
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

  // console.log("generatedCode::", generatedCode);

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
      <main className="mt-12 flex w-full flex-row items-start justify-start bg-purple-800 pr-4 font-mono">
        {/* <SideBar /> */}
        <div
          className={`relative hidden h-screen flex-col items-center duration-300 sm:block ${
            sidebarOpen ? "w-20" : "w-72"
          } bg-purple-700 p-5 pt-8`}
        >
          <HomeIcon
            size={30}
            color="white"
            className="my-6 cursor-pointer border-purple-300 text-purple-400"
          />
          <MessageCircleIcon
            size={30}
            color="white"
            className="my-6 cursor-pointer border-purple-300 text-purple-400"
          />
          <Codepen
            size={30}
            color="white"
            className="my-6 cursor-pointer border-purple-300 text-purple-400"
          />
          <CodeIcon
            size={30}
            color="white"
            className="my-6 cursor-pointer border-purple-300 text-purple-400"
          />
          {/* <SidebarArrow
            color="white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`${
              !sidebarOpen && "rotate-180"
            } absolute -right-3 top-2 cursor-pointer rounded-full border border-purple-300 text-purple-400`}
          /> */}
        </div>
        {/* <SideBar /> */}
        <div>
          <hr className="border-1 mt-12 h-px w-full " />
        </div>
        <div id="container" className="relative mx-3 h-64 w-full">
          <h1 className="text-1xl left-2 mb-4 w-full text-purple-300">
            CODE COMPLEMENTATIONS AND SUGGESTIONS
          </h1>
          <hr className="border-1 mt-1 h-px w-full border-purple-400" />
          <div className="mt-14">
            <div className="absolute top-4 w-full">
              <p className="mt-9 border-b-[1px] border-purple-800 bg-purple-700 p-2 font-popins text-lg font-bold leading-7 text-white">
                Paste your code and look for code suggestions
              </p>
            </div>
            <textarea
              className="focus:shadow-outline h-64 min-w-full resize-none rounded-md border-none bg-purple-700 pt-4 text-gray-200 placeholder:pt-1 focus:border-purple-700 focus:ring-purple-700 active:border-purple-700"
              value={codeSentence}
              onChange={(e) => setCodeSentence(e.target.value)}
              rows={4}
              placeholder={`e.g. export default function App() {
     return <h1>Hello world</h1>
}`}
            />
          </div>
          <div className="absolute -bottom-3 left-3">
            <DropDown
              elements={langElements}
              element={langElement}
              setElement={(newElement) => setLangElement(newElement)}
            />
          </div>
          <div className="absolute left-48 -bottom-3 ml-2">
            <DropDown
              elements={libElements}
              element={lib}
              setElement={(newLib) => setLib(newLib)}
            />
          </div>
          <div className="absolute right-2 -bottom-14 mb-[2px]">
            <Button
              onClick={onCodeGeneration}
              loading={loading}
              variant="mint"
              text="Generate"
            />
          </div>
          <div className="absolute right-32 -bottom-14 mb-[2px]">
            <Button
              hidden={false}
              onClick={onSaveCode}
              variant="mint"
              loading={false}
              text="Save Code"
            />
          </div>

          {/* <StopButton
            onCancel={stopGeneration}
            loading={loading}
            text="Stop Generating"
          /> */}

          <ResizablePanel>
            <AnimatePresence mode="sync">
              <motion.div className="my-10 space-y-10">
                {generatedCode && (
                  <GenerateCode
                    langElement={langElement}
                    generatedCode={generatedCode}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </div>
      </main>
    </>
  )
}
