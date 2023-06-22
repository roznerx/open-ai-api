"use client"

import { authHeader } from "@/lib/constants"
import { useSignInModal } from "app/components/modals/SignInModal"
import CombinedMessages from "app/components/shared/CombinedMessages"
import HeaderWrapper from "app/components/shared/HeaderWrapper"
import ChatContainer from "app/home/ChatContainer"
import Loading from "app/suspenseLoading"
import useWindowSize from "hooks/use-window-size"
import Image from "next/image"
import React, {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { generateCodeWithTurbo } from "utils/generateCode"

const fetchOptions =  { method: 'GET', headers: { accept: 'application/json'} };
const MOVIES_ENDPOINT =
    "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f";

  // Function to fetch movies from the API
  async function getMovies(args: { query: string; }) {
    const response = await fetch(`${MOVIES_ENDPOINT}&query=${args.query}`, fetchOptions)
    const data = await response.json();
    return data;
  }

  const functions = [
    {
      name: "getMovies",
      description: "Get a collection of movies and it's metadata",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The query string for a movie",
          },
        },
        required: ["query"],
      },
    },
  ] 


export default function Page() {
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal({
    userHasAccount: true,
  })
  const textareaRef = useRef<any>(null)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const { isMobile } = useWindowSize()
  const [codeSentence, setCodeSentence] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [generatedCode, setGeneratedCode] = useState<string>("")

  const codeMessages = useRef([
    {
      role: "system",
      content: `You are a recommendation agent, who gives the user movies recommendations based on movie rating.`,
    },
  ])

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const onCodeGeneration = async (e: KeyboardEvent<HTMLInputElement>) => {

    if (codeSentence.length === 0 || codeSentence === "") {
      return false
    }

    if (e.key === "Enter") {
      setIsLoading(true)
      
      codeMessages.current = [
        ...codeMessages.current,
        {
          role: "user",
          content: codeSentence,
        },
      ]
      let initialResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        method: "POST",
        body: JSON.stringify({
          messages: [...codeMessages.current],
          model: "gpt-3.5-turbo-0613",
          functions: functions,
          function_call: "auto",
        }),
      })
    
      const json = await initialResponse.json()
      

      if (json.choices[0].finish_reason === "function_call") { 
        //parse name of the function
        // const functionName = json.choices[0].message.function_call.function
        //parse functino arguments
        const functionArguments = JSON.parse(json.choices[0].message.function_call.arguments)
        const functionContent = await getMovies(functionArguments)
        console.log("functionContent:", functionContent.results)
        
        // console.log("Payload: ", [...codeMessages.current, { role: "function", "name": "getMovies", content: JSON.stringify(functionContent.results.splice(0, 3)) }])
        const functionsMessage = { role: "function", "name": "getMovies", content: JSON.stringify(functionContent.results) }
        
        generateCodeWithTurbo(reader, codeMessages, setReader, setGeneratedCode, functions, functionsMessage, setCodeSentence, setIsLoading)

        // await fetch("/api/generateWithTurbo", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     messages: [...codeMessages.current, { role: "function", "name": "getMovies", content: JSON.stringify(functionContent.results.splice(0, 3)) }],
        //     functions: functions
        //   }),
        // })  
        
      } 

    }
  }

  const onArrowPress = async () => {
    setIsLoading(true)
    //Store the code sentence in the current code-messages ref.
    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: codeSentence,
      },
    ]

    let initialResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      method: "POST",
      body: JSON.stringify({
        messages: [...codeMessages.current],
        model: "gpt-3.5-turbo-0613",
        functions: functions,
        function_call: "auto",
      }),
    })
  
    const json = await initialResponse.json()
    

    if (json.choices[0].finish_reason === "function_call") { 
      //parse name of the function
      // const functionName = json.choices[0].message.function_call.function
      //parse functino arguments
      const functionArguments = JSON.parse(json.choices[0].message.function_call.arguments)
      const functionContent = await getMovies(functionArguments)
      console.log("functionContent:", functionContent.results)
      
      // console.log("Payload: ", [...codeMessages.current, { role: "function", "name": "getMovies", content: JSON.stringify(functionContent.results.splice(0, 3)) }])
      const functionsMessage = { role: "function", "name": "getMovies", content: JSON.stringify(functionContent.results) }
      
      generateCodeWithTurbo(reader, codeMessages, setReader, setGeneratedCode, functions, functionsMessage, setCodeSentence, setIsLoading)
      
      
    } 
    
  }

  const generatedMessages = useMemo(
    () => generatedCode.split("<>").filter((i) => i !== ""),
    [generatedCode],
  )
  // console.log("generatedMessages:", generatedMessages)
  // console.log('codeMessages.current:: ', codeMessages.current);
  return (
    <>
      <HeaderWrapper
        setShowSignInModal={setShowSignInModal}
        showSignInModal={showSignInModal}
        session={null}
        userHasAccount={null}
      />
      <div className="relative ml-1 flex w-full flex-col items-center justify-center font-sans sm:mx-auto sm:w-full">
      <h1 className="mt-36 mb-24 text-4xl font-extrabold leading-none tracking-tight text-white/70 md:text-5xl lg:text-6xl ">Film App</h1>
        <div className="relative mt-2 h-12 w-full text-center sm:w-[900px]">
          <input
            className="font-lg h-12 w-[95%] rounded-lg bg-purple-400 py-2.5 
             pl-3 pr-12 text-white outline-0 placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px] placeholder:text-gray-400 hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 sm:w-[900px]"
            value={codeSentence}
            onChange={(e) => setCodeSentence(e.target.value)}
            onKeyDown={(e) => onCodeGeneration(e)}
            placeholder={
              generatedMessages.length <= 0
                ? "Ask me anyting about movies"
                : ""
            }
          />
          <button className="absolute right-4 top-[6px] rounded-lg bg-gray-900 p-1 disabled:hover:bg-transparent sm:right-1">
            <Image
              className="mb-1 mr-2 pt-2 pb-1 pl-2 text-white"
              alt="Send"
              width={24}
              height={24}
              src="/home/send.svg"
              onClick={() => onArrowPress()}
            />
          </button>
        </div>
        <div className="h-[330px] sm:h-[380px] sm:w-[930px]">
          {isLoading && <Loading />}
          {generatedMessages.length > 0 && (
            <ChatContainer
              isMobile={isMobile}
              messages={
                <CombinedMessages generatedMessages={generatedMessages} />
              }
            />
          )}
        </div>
      </div>
    </>
  )
}
