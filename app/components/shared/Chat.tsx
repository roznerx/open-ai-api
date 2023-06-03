import "./chat.css"

import { useEffect, useState } from "react"
import ChatContainer from "app/home/ChatContainer"

import PromptCard from "./PromptCard"
import { CombinedMessages } from "./CombinedMessages"

// export const Messages: React.FC<CodeMessagesProps> = ({
//   generatedMessages,
// }) => {
//   return (
//     <>
//       {generatedMessages.map((generatedMessage) => {
//         const result = parseText(generatedMessage)

//         return (
//           result.length &&
//           result.map((item: any) => {
//             if (item.hasOwnProperty("code")) {
//               // eslint-disable-next-line react/jsx-key
//               return <GenerateCode align="start" generatedCode={item.code} />
//             }

//             if (item.hasOwnProperty("text")) {
//               return (
//                 // eslint-disable-next-line react/jsx-key
//                 <p className="rounded-lg bg-purple-400 p-2 text-left leading-7">
//                   {item.text}
//                 </p>
//               )
//             }
//           })
//         )
//       })}
//     </>
//   )
// }

export default function Chat({ generatedResponse, setCodeSentence }) {
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    if (prompt !== "") {
      setCodeSentence(prompt)
    }
  }, [prompt, setCodeSentence])

  return (
    <div className="mt-18 flex h-auto items-center justify-center overflow-scroll rounded-md sm:mx-auto sm:mt-0 sm:flex-row ">
      {generatedResponse.length > 0 && (
        <div className="mt-24 sm:mt-0">
          <ChatContainer
            useFullHeight
            useFullWidth
            messages={
              <CombinedMessages generatedMessages={generatedResponse} />
            }
          />
        </div>
      )}
      {generatedResponse.length === 0 && (
        <>
          <div className="mb-20 grid max-h-[80vh] grid-cols-1 place-items-center gap-3 overflow-y-auto pt-24 sm:col-span-2 sm:grid-cols-4">
            <PromptCard
              onClick={setPrompt}
              title="Create React App"
              text="How to use the Create React App npm package"
            />
            <PromptCard
              onClick={setPrompt}
              title="Create Next App"
              text="How to use the the Create Next App npm package"
            />
            <PromptCard
              onClick={setPrompt}
              title="Typescript"
              text="Explain how to use Typescript with React"
            />
            <PromptCard
              onClick={setPrompt}
              title="Development"
              text="What are the best practice in software development"
            />
            <PromptCard
              onClick={setPrompt}
              title="Python"
              text="How to create a function in Python?"
            />
            <PromptCard
              onClick={setPrompt}
              title="AWS"
              text="Explain how to use the AWS API"
            />
            <PromptCard
              onClick={setPrompt}
              title="Database"
              text="What's the best Database with Typescript support"
            />
            <PromptCard
              onClick={setPrompt}
              title="React Testing"
              text="Explain how to use Jest with React Testing Library"
            />
          </div>
        </>
      )}
    </div>
  )
}
