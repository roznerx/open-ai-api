import { CodeMessagesProps } from "app/home/HomeChat"
import Image from "next/image"
import React from "react"
import { parseText } from "utils/parseText"
import GenerateCode from "../GenerateCode"

const LogoCodeGenius = React.memo(() => (
  <Image
    src={"/logo/code-genius.svg"}
    width={33}
    height={33}
    alt="Code Genius"
  />
))

export const CombinedMessages: React.FC<CodeMessagesProps> = ({
  generatedMessages,
  fontColor,
  userName,
}) => {
  return (
    <>
      {generatedMessages.map((message) => {
        const result = parseText({ message })

        return result.length
          ? result.map((item: any, idx) => {
              if (item.hasOwnProperty("text")) {
                return (
                  <div key={idx} className="mx-2 flex">
                    <div className="flex items-center justify-center">
                      <div className="">
                        {item.role === "user" ? (
                          <div className="flex items-center justify-center">
                            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado text-center font-medium">
                              {userName.substring(0, 1)}
                            </span>
                          </div>
                        ) : item.text !== "" ? (
                          <LogoCodeGenius />
                        ) : null}
                      </div>
                    </div>
                    <div className={`w-full rounded-lg bg-purple-400 p-2`}>
                      <p
                        style={{ borderRadius: "0px" }}
                        className={`ml-1 text-left leading-7 ${
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
}
