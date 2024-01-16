import GenerateCode from "../GenerateCode"
import { CodeMessagesProps } from "utils/types"
import React from "react"
import Image from "next/image"
import { parseText, parseTextHome } from "utils/parseText"

const LogoCodeGenius = React.memo(() => (
  <Image
    src={"/logo/code-genius.svg"}
    width={32}
    height={32}
    alt="Code Genius"
  />
))

const UserAvatar = ({ username }) => {
  return (
    <div className="-ml-1 flex items-center justify-center">
      <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado p-1 text-center font-medium ">
        {username}
      </span>
    </div>
  )
}

export const CombinedMessages: React.FC<CodeMessagesProps> = React.memo(
  ({
    userName,
    isLegacy,
    generatedMessages,
    fontColor,
  }: {
    isLegacy?: boolean
    userName?: string
    generatedMessages: []
    fontColor?: string
  }) => {
    return (
      <>
        {generatedMessages.map((generatedMessage: any) => {
          const result = isLegacy
            ? parseTextHome(generatedMessage)
            : parseText({
                message: generatedMessage,
              })
          const role = !isLegacy ? generatedMessage?.role : "system"

          return result.length
            ? result.map((message: any, idx) => {
                if (message.hasOwnProperty("text") && message?.text !== "") {
                  return (
                    <div key={idx} className="mt-1 flex">
                      <div className="ml-6 flex items-center justify-center">
                        {role === "user" ? (
                          <UserAvatar username={userName?.substring(0, 1)} />
                        ) : (
                          <LogoCodeGenius />
                        )}
                      </div>
                      <div
                        className={`mx-auto ml-3 w-[92%] rounded-lg bg-purple-400 p-2`}
                      >
                        <p
                          style={{ borderRadius: "0px" }}
                          className={`ml-2 text-left leading-7 ${
                            fontColor ? fontColor : "text-white"
                          }`}
                        >
                          {message.text}
                        </p>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <GenerateCode
                      key={idx}
                      borderRadius="none"
                      align="start"
                      generatedCode={message.code}
                    />
                  )
                }
              })
            : null
        })}
      </>
    )
  },
)
