import { CodeMessagesProps } from "app/home/HomeChat"
import Image from "next/image"
import React from "react"
import { parseText } from "utils/parseText"
import GenerateCode from "../GenerateCode"

const LogoCodeGenius = React.memo(() => (
  <Image
    src={"/logo/code-genius.svg"}
    width={32}
    height={32}
    className={"right-8"}
    alt="Code Genius"
  />
))

export const CombinedMessages: React.FC<CodeMessagesProps> = React.memo(
  ({
    generatedMessages,
    fontColor,
  }: {
    generatedMessages: []
    fontColor?: string
  }) => {
    return (
      <>
        {generatedMessages.map((generatedMessage) => {
          const result = parseText(generatedMessage)

          return result.length
            ? result.map((item: any, idx) => {
                if (item.hasOwnProperty("text")) {
                  return (
                    <div key={idx} className="mr-9 flex">
                      <div className="ml-6 flex items-center justify-center">
                        <LogoCodeGenius />
                      </div>
                      <div
                        className={`mx-auto ml-3 w-full rounded-lg bg-purple-400 p-2`}
                      >
                        <p
                          style={{ borderRadius: "0px" }}
                          className={`ml-2 text-left leading-7 ${
                            fontColor ? fontColor : "text-white"
                          }`}
                        >
                          {item.text}
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
                      generatedCode={item.code}
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
