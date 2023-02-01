import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { CopyBlock, dracula } from "react-code-blocks";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { ElementType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [codeSentence, setCodeSentence] = useState("");
  const [langElement, setLangElement] = useState<ElementType>("Typescript");
  const [lib, setLib] = useState<ElementType>("React");
  const [generatedCode, setGeneratedCode] = useState<String>("");

  let libElements: ElementType[] = ["React" , "Vue"];
  let langElements: ElementType[] = ["Typescript", "Javascript"];
  
  console.log("Streamed response: ", generatedCode);
  console.log("lib: ", lib);

  const prompt =
  langElement === "Typescript"
      ? `Generate an App, written in Typescript and ${lib}, clearly labeled "1.","2." and "3.". Make sure to write the App based on this context: ${codeSentence}${
          codeSentence.slice(-1) === "." ? "" : "."
        }`
      : `Generate 2 ${langElement} twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 20 words and base them on this context: ${codeSentence}${
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
    console.warn("Edge function returned.");
    console.warn("response::", response);

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

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedCode((prev) => prev + chunkValue);
      if (done) {
        setLoading(false);
      }
    }


    
  };

  return (
    <div className="flex min-w-max mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>AIntelligent Code Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20 min-w-full">
   
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Generate Code
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
          <div className="p-4 text-white rounded-full bg-black flex items-center justify-center font-mono h-5 w-5 text-sm">
          1
          </div>
            <p className="text-left font-medium">
              Write a few sentences about what do you want to acomplish using Typescript or Javascripr
            </p>
          </div>
          <textarea
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Write a real time chat system using socket io."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
          <div className="p-4 text-white rounded-full bg-black flex items-center justify-center font-mono h-5 w-5 text-sm">
          2
          </div>
            <p className="text-left font-medium">Select your flavor.</p>
          </div>
          <div className="block">
            <DropDown elements={langElements} element={langElement} setElement={(newElement) => setLangElement(newElement)} />
          </div>
     
          <div className="flex mt-8 mb-5 items-center space-x-3">
        
          <div className="p-4 text-white rounded-full bg-black flex items-center justify-center font-mono h-5 w-5 text-sm">
          3
          </div>
            <p className="text-left font-medium">Select the library of your preference</p>
          </div>
          
          <div className="block">
            <DropDown elements={libElements} element={lib} setElement={(newLib) => setLib(newLib)} />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateCode(e)}
            >
              Generate the code you want, just be creative &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
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
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedCode && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your generated code:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedCode
                      .substring(generatedCode.indexOf("1") + 0)
                      .split("1.")
                      .map((generated, idx) => {
                        // if (idx === 0) {
                        //   return
                        // }
                        return (
                          <div
                            className="bg-white text-left min-w-full w-fit rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border px-2"
                            onClick={() => {
                              navigator.clipboard.writeText(generated);
                              toast("Code copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generated}
                          >
                            <CopyBlock
                              className="w-auto bg-white"
                              text={generated}
                              showLineNumbers
                              language={langElement === "Typescript" ? "tsx" : "jsx"}
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
