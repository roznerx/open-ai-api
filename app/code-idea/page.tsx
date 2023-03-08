"use client";

import DropDown, { ElementType } from "app/components/DropDown";
import { ChangeEvent, SetStateAction, useState } from "react";
import ResizablePanel from "app/components/ResizablePanel";
import Button, { StopButton } from "app/components/Button";
import BulletPoint from "app/components/BulletPoint";
import GenerateCode from "app/components/GenerateCode";
import Modal from "app/components/Modal";
import useLocalStorage from "hooks/use-localstorage";
import { AnimatePresence, motion } from "framer-motion";
import { LSConfig, promptResponseTimeout } from "@/lib/constants";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [modaIsOpen, setModaIsOpen] = useState(false);
  const [showSavePromptModal, setShowSavePromptModal] = useState(false);
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const [codeSentence, setCodeSentence] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [langElement, setLangElement] = useState<ElementType>("Typescript");
  const [lib, setLib] = useState<ElementType>("React");
  const [generatedCode, setGeneratedCode] = useState<String>("");
  const [userId] = useLocalStorage(LSConfig.user.userId, "");
  const controller = new AbortController();

  // console.log("userId", userId);

  let libElements: ElementType[] = ["React", "Vue", "Angular"];
  let langElements: ElementType[] = ["Typescript", "Javascript"];

  // Requirements: As the forth step, make sure to code comment on the folder and file structure.
  const prompt = `Generate code written in ${langElement} and ${lib}, clearly labeled "**::", "// 1.", "// 2.", "// 3." and "// 4.". 
   Context: ${codeSentence}${codeSentence.slice(-1) === "." ? "" : "."}`;

  const onCodeGeneration = () => {
    generateCode();
  };

  const generateCode = async () => {
    console.log("prompt: ", prompt);
    setLoading(true);

    const id = setTimeout(() => {
      controller.abort();
      setLoading(false);
      setModaIsOpen(true);
      // setCodeSentence("");
    }, promptResponseTimeout);

    setGeneratedCode("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    // console.log("response", response);
    // clear timeout
    clearTimeout(id);

    if (!response.ok) {
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;

    if (!data) {
      setLoading(false);
      return;
    }

    const reader = data.getReader();
    setReader(reader);
    const decoder = new TextDecoder();
    let done = false;
    try {
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        let chunkValue = decoder.decode(value);
        setGeneratedCode((prev) => prev + chunkValue);
      }
    } catch (error) {
      return `There was an error with your request ${error}`;
    } finally {
      setLoading(false);
      setReader(null);
    }
    if (done) {
      setLoading(false);
    }
  };

  const onSaveCode = () => {
    setShowSavePromptModal(true);
  };

  const onSaveQuestionModal = () => {
    const payload = {
      userId,
      questionName,
      prompt: generatedCode,
    };
    fetch("/api/prompt/save", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => console.log("res:", res));
  };

  console.log("generatedCode::", generatedCode);

  const stopGeneration = async () => {
    setLoading(false);
    controller.abort();
    if (!reader) {
      return;
    }
    try {
      await reader.cancel();
      // setReader(null);
    } catch (error: any) {
    } finally {
      setReader(null);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionName(event.target.value);
  };

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
      <main className="mt-12 flex w-full min-w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="max-w-2xl text-4xl font-bold text-slate-900 sm:text-6xl">
          Code Idea 💡
        </h1>
        <div className="w-full max-w-xl">
          <BulletPoint
            number={1}
            text="Describe in a few sentences what do you want to do:"
          />
          <textarea
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            rows={4}
            className="mt-3 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={"e.g. Write a real-time chat system using socket io."}
          />
          <BulletPoint number={2} text="Select your preference:" />
          <DropDown
            elements={langElements}
            element={langElement}
            setElement={(newElement) => setLangElement(newElement)}
          />
          <BulletPoint number={3} text="Choose your library:" />
          <DropDown
            elements={libElements}
            element={lib}
            setElement={(newLib) => setLib(newLib)}
          />
          <Button
            onClick={onCodeGeneration}
            loading={loading}
            text="Generate"
          />

          <StopButton
            onCancel={stopGeneration}
            loading={loading}
            text="Stop Generating"
          />

          <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
          <ResizablePanel>
            <AnimatePresence mode="popLayout">
              <motion.div className="my-10 space-y-10">
                {generatedCode && (
                  <GenerateCode
                    langElement={langElement}
                    generatedCode={generatedCode}
                  />
                )}
                {/* <CopyBlock
                codeBlock
                text={`const Chat = () => {
                      const [message, setMessage] = useState('');
                      const [messages, setMessages] = useState([]);
                    
                      const sendMessage = (event) => {
                        event.preventDefault();
                        setMessages([...messages, message]);
                        setMessage('');
                      }`}
                language={langElement === "Typescript" ? "tsx" : "jsx"}
                theme={codepen}
              /> */}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
          <Button
            hidden={false}
            onClick={onSaveCode}
            loading={false}
            text="Save Code"
          />
        </div>
      </main>
    </>
  );
}
