import { CodeMessagesProps } from "app/home/HomeChat"
import React from "react"
import { parseText } from "utils/parseText"
import GenerateCode from "../GenerateCode"

export const CombinedMessages: React.FC<CodeMessagesProps> = React.memo(
  ({
    generatedMessages,
    fontColor,
    logoCodeGenius,
  }: {
    generatedMessages: []
    fontColor?: string
    logoCodeGenius?: React.ReactNode
  }) => {
    return (
      <>
        {generatedMessages.map((generatedMessage) => {
          const result = parseText(generatedMessage)

          return result.length
            ? result.map((item: any, idx) => {
                if (item.hasOwnProperty("text")) {
                  return (
                    <div key={idx} className="flex">
                      <div className="ml-6">
                        {logoCodeGenius ? logoCodeGenius : null}
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
