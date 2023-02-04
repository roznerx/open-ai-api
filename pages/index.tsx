import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import DropDown, { ElementType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ResizablePanel from "../components/ResizablePanel";
import Button, { StopButton } from "../components/Button";
import BulletPoint from "../components/BulletPoint";
import GenerateCode from "../components/GenerateCode";
import MyModal from "../components/Modal";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [modaIsOpen, setModaIsOpen] = useState(false);
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const [codeSentence, setCodeSentence] = useState("");
  const [langElement, setLangElement] = useState<ElementType>("Typescript");
  const [lib, setLib] = useState<ElementType>("React");
  const [generatedCode, setGeneratedCode] = useState<String>("");

  let libElements: ElementType[] = ["React", "Vue"];
  let langElements: ElementType[] = ["Typescript", "Javascript"];

  const prompt = `Generate code written in ${langElement} and ${lib}, clearly labeled "// 1.", "// 2." and "// 3.", with and no additional comments. 
      Make sure to comment on the generated code and write the code based on this context: ${codeSentence}${
    codeSentence.slice(-1) === "." ? "" : "."
  }`;

  const generateCode = async () => {
    setGeneratedCode("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      <MyModal isOpen={modaIsOpen} setIsOpen={setModaIsOpen} />;
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
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
        if (done) {
          setLoading(false);
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setReader(null);
    }
  };

  const onCodeGeneration = () => {
    generateCode();
  };

  const stopGeneration = async () => {
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

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Header />
      <main className="mt-12 flex w-full min-w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="max-w-2xl text-4xl font-bold text-slate-900 sm:text-6xl">
          Generate Code
        </h1>
        <div className="w-full max-w-xl">
          <BulletPoint
            number={1}
            text="Write a few sentences about what do you want to accomplish:"
          />
          <textarea
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            rows={4}
            className="mt-3 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={"e.g. Write a real-time chat system using socket io."}
          />
          <BulletPoint number={2} text="Select your flavor:" />
          <DropDown
            elements={langElements}
            element={langElement}
            setElement={(newElement) => setLangElement(newElement)}
          />
          <BulletPoint
            number={3}
            text="Select the library of your preference:"
          />
          <DropDown
            elements={libElements}
            element={lib}
            setElement={(newLib) => setLib(newLib)}
          />
          <Button
            onClick={onCodeGeneration}
            loading={loading}
            text="Generate Code"
          />
          <StopButton
            onCancel={stopGeneration}
            loading={loading}
            text="Stop Generating"
          />
        </div>
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
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
