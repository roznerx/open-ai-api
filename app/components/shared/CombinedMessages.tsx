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
    alt="Code Genius"
  />
))

export const CombinedMessages: React.FC<CodeMessagesProps> = React.memo(
  ({ generatedMessages, fontColor, userName }) => {
    return (
      <>
        {generatedMessages.map((generatedMessage) => {
          const result = parseText({
            text: generatedMessage,
          })

          return result.length
            ? result.map((item: any, idx) => {
                if (item.hasOwnProperty("text")) {
                  return (
                    item.text !== "" && (
                      <div key={idx} className="mr-9 flex">
                        <div className="ml-2 flex items-center justify-center">
                          {generatedMessages.length === 0 ? (
                            <div className="flex items-center justify-center">
                              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado text-center font-medium ">
                                {userName}
                              </span>
                            </div>
                          ) : (
                            <LogoCodeGenius />
                          )}
                        </div>
                        <div className={` w-full rounded-lg bg-purple-400 p-2`}>
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
                  )
                } else {
                  return (
                    <div className="mx-2" key={idx}>
                      <GenerateCode
                        borderRadius="none"
                        align="start"
                        generatedCode={item.code}
                      />
                    </div>
                  )
                }
              })
            : null
        })}
      </>
    )
  },
)
