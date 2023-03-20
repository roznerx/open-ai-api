import {
  ChatContainer,
  MainContainer,
  Message,
  MessageList,
} from "@chatscope/chat-ui-kit-react"
import { Send } from "lucide-react"
import tailwindConfig from "tailwind.config.js"
import GenerateCode from "../GenerateCode"

export default function Chat({
  generatedResponse,
  onArrowPress,
  codeSentence,
  setCodeSentence,
  onCodeGeneration,
  useArrow,
}) {
  const colors: any = tailwindConfig.theme?.extend?.colors

  return (
    <MainContainer className="mb-14 flex min-h-screen min-w-[100%] flex-col justify-end overflow-scroll rounded-md">
      {generatedResponse.length > 0 && (
        <ChatContainer
          className="min-w-[100%];
        "
        >
          <MessageList className="w-[80%] min-w-[100%]">
            {generatedResponse.map((generatedMessage) => {
              let finalCode
              // console.log("generatedMessage:", generatedMessage)
              let matchData = [...generatedMessage.matchAll(/```/g)]

              const codeString = Array.from(matchData, (m) => m[1]).join("```")
              console.log("code string Data: ", codeString)
              console.log("matchData: ", matchData)
              const hash = generatedMessage.indexOf("```")
              if (hash !== -1) {
                const customCode = generatedMessage.substring(hash)
                const secondIndex = customCode.substring(3).indexOf("```")
                finalCode = generatedMessage.substring(
                  hash,
                  matchData[1]?.["index"],
                )
                console.log("finalCode: ", finalCode.substring(3))
              }

              return finalCode ? (
                <GenerateCode
                  align="start"
                  generatedCode={finalCode.replace("tsx", "").substring(3)}
                />
              ) : (
                <Message
                  model={{
                    message: generatedMessage,
                    direction: "incoming",
                    position: "normal",
                  }}
                />
              )
            })}
          </MessageList>
        </ChatContainer>
      )}
      <div className="fixed bottom-4 left-0 right-0 m-auto w-[76%]">
        <textarea
          value={codeSentence}
          onChange={(e) => setCodeSentence(e.target.value)}
          onKeyDown={(e) => onCodeGeneration(e)}
          rows={2}
          className="h-8 w-[100%] resize-none rounded-md p-0 placeholder:pl-2 placeholder:pt-1 placeholder:text-sm placeholder:text-slate-200 focus:border-transparent focus:ring-black/30 dark:bg-slate-700 dark:text-slate-200"
          placeholder={"type message here"}
        ></textarea>
        {useArrow && (
          <button className="absolute right-1 mt-1 rounded-md p-1 text-gray-500 hover:bg-gray-100 disabled:hover:bg-transparent dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:disabled:hover:bg-transparent md:bottom-2.5 md:right-2">
            <Send
              color={colors.specialBlue}
              size="18"
              onClick={() => {
                onArrowPress()
              }}
            />
          </button>
        )}
      </div>
    </MainContainer>
  )
}
