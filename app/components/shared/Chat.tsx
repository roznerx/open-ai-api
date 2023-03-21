import "./chat.css"
import {
  ChatContainer,
  MainContainer,
  Message,
  MessageList,
} from "@chatscope/chat-ui-kit-react"
import { Send } from "lucide-react"
import tailwindConfig from "tailwind.config.js"
import { parseText } from "utils/parseText"
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

  const CodeMessages = () => {
    return generatedResponse.map((generatedMessage) => {
      const result = parseText(generatedMessage)
      console.log("result:", result)

      return result.length
        ? result.map((item: any) => {
            if (item.hasOwnProperty("text")) {
              return (
                <Message
                  className="my-2"
                  model={{
                    message: item.text,
                    direction: "incoming",
                    position: "normal",
                  }}
                />
              )
            } else {
              return <GenerateCode align="start" generatedCode={item.code} />
            }
          })
        : null
    })
  }

  return (
    <MainContainer className="flex max-h-[550px] min-w-[100%] flex-col overflow-scroll rounded-md">
      {generatedResponse.length > 0 && (
        <ChatContainer className="min-w-[100%]">
          <MessageList className="w-[80%] min-w-[100%] bg-gray-300 dark:bg-gray-900">
            <CodeMessages />
          </MessageList>
        </ChatContainer>
      )}
      <div className="fixed bottom-4 left-0 right-0 m-auto w-[82%]">
        <textarea
          className="w-[100%] resize-none rounded-md p-1 pl-1 font-mono placeholder:pl-2 placeholder:pt-1 placeholder:text-sm placeholder:text-slate-200 focus:border-transparent focus:ring-black/30 dark:bg-slate-700 dark:text-slate-200"
          value={codeSentence}
          onChange={(e) => setCodeSentence(e.target.value)}
          onKeyDown={(e) => onCodeGeneration(e)}
          rows={1}
          placeholder={"type a code idea here 🤓"}
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
