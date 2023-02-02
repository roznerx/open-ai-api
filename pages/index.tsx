import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { CopyBlock, dracula } from "react-code-blocks";
import Head from "next/head";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { ElementType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [codeSentence, setCodeSentence] = useState("");
  const [langElement, setLangElement] = useState<ElementType>("Typescript");
  const [lib, setLib] = useState<ElementType>("React");
  const [generatedCode, setGeneratedCode] = useState<String>("");

  let libElements: ElementType[] = ["React", "Vue"];
  let langElements: ElementType[] = ["Typescript", "Javascript"];

  const prompt = `Generate code written in ${langElement} and ${lib}, clearly labeled "1." with and no additional comments. 
      Make sure to comment on the generated code and write the code based on this context: ${codeSentence}${
    codeSentence.slice(-1) === "." ? "" : "."
  }`;

  const generateCode = async (e: any) => {
    e.preventDefault();
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
    // console.warn("Edge function returned.");
    // console.warn("response::", response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let counter = 0;
    while (!done) {
      ++counter;
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      let chunkValue = decoder.decode(value);
      setGeneratedCode((prev) => prev + chunkValue);
      if (done) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Head>
        <title>AIntelligent Code Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="mt-12 flex w-full min-w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="max-w-2xl text-4xl font-bold text-slate-900 sm:text-6xl">
          Generate Code
        </h1>
        <div className="w-full max-w-xl">
          <div className="mt-10 flex items-center space-x-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-4 font-mono text-sm text-white">
              1
            </div>
            <p className="text-left font-medium">
              Write a few sentences about what do you want to accomplish:
            </p>
          </div>
          <textarea
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            rows={4}
            className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={"e.g. Write a real-time chat system using socket io."}
          />
          <div className="mb-5 flex items-center space-x-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-4 font-mono text-sm text-white">
              2
            </div>
            <p className="text-left font-medium">Select your flavor:</p>
          </div>
          <div className="block">
            <DropDown
              elements={langElements}
              element={langElement}
              setElement={(newElement) => setLangElement(newElement)}
            />
          </div>

          <div className="mt-8 mb-5 flex items-center space-x-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-4 font-mono text-sm text-white">
              3
            </div>
            <p className="text-left font-medium">
              Select the library of your preference:
            </p>
          </div>

          <div className="block">
            <DropDown
              elements={libElements}
              element={lib}
              setElement={(newLib) => setLib(newLib)}
            />
          </div>

          {!loading && (
            <button
              // bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500
              className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
              onClick={(e) => generateCode(e)}
            >
              Generate Code
            </button>
          )}
          {loading && (
            <button
              className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="popLayout">
            <motion.div className="my-10 space-y-10">
              {generatedCode && (
                <>
                  <div>
                    <h2 className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl">
                      Your generated code:
                    </h2>
                  </div>
                  <div className="mx-auto flex flex-col items-center justify-center ">
                    {generatedCode
                      .substring(generatedCode.indexOf("1") + 0)
                      .split("1.")
                      .map((generated, idx) => {
                        if (idx === 0) {
                          return;
                        }
                        return (
                          <div
                            className="rounded-xl border bg-white p-4 px-2 text-left font-mono shadow-md transition hover:bg-gray-100 sm:w-auto lg:w-2/3"
                            key={generated}
                          >
                            <CopyBlock
                              text={generated}
                              language={
                                langElement === "Typescript" ? "tsx" : "jsx"
                              }
                              codeBlock
                              theme={dracula}
                            />
                          </div>
                        );
                      })}
                  </div>
                </>
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
