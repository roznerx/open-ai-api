import React from "react"
import { CodeMessagesProps } from "utils/types"

// const LogoCodeGenius = React.memo(() => (
//   <Image
//     src={"/logo/code-genius.svg"}
//     width={33}
//     height={33}
//     alt="Code Genius"
//   />
// ))

export const CombinedMessages: React.FC<CodeMessagesProps> = ({
  pathName,
  generatedMessages,
  fontColor,
  userName,
  bg = "bg-purple-400",
}) => {
  return (
    <>
      {generatedMessages.map((message, idx) => {
        return (
          <>
            <div key={idx} className={`w-full rounded-lg ${bg} p-2`}>
              <p className={`px-4 text-left w-[900px] leading-7 text-white`}>
                {message}
              </p>
            </div>
          </>
        )
      })}
      {/* {generatedMessages.map((message) => {
        // console.log('message');
        
        const result =
          pathName !== "/code-idea"
            ? parseText({ message })
            : legacyParseText({ text: message })

        return result.length
          ? result.map((item: any, idx) => {
              if (item.hasOwnProperty("text")) {
                return (
                  <div
                    key={idx}
                    className="mx-4 mt-2 flex w-full sm:mx-auto sm:w-3/4 "
                  >
                    <div className="flex items-center justify-center">
                      <div className="mr-2">
                        {item.role === "user" ? (
                          <div className="flex items-center justify-center">
                            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado text-center font-medium">
                              {userName ? (
                                userName.substring(0, 1)
                              ) : (
                                <User size={20} color="white" />
                              )}
                            </span>
                          </div>
                        ) : item.text !== "" ? (
                          <LogoCodeGenius />
                        ) : null}
                      </div>
                    </div>
                    <div className={`w-full rounded-lg ${bg} p-2`}>
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
      })} */}
    </>
  )
}

export default CombinedMessages
