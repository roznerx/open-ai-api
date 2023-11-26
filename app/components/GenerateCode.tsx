"use client"

import useWindowSize from "hooks/use-window-size"
import SyntaxHighlighter from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"
import React from "react"
import tailwindConfig from "tailwind.config.js"

type GenerateCode = {
  generatedCode: String
  langElement?: string
  isCodeIdea?: boolean
  backgroundColor?: string
  align?: string
  width?: string
  themeColors?: any
  borderRadius?: string
  onSaveCode?: () => void
}

const themeColors: any = tailwindConfig.theme?.extend?.colors
const regex = /^x/

function GenerateCode({
  align = "center",
  generatedCode,
  langElement,
}: GenerateCode) {
  const { isMobile } = useWindowSize()
  const minWidth = isMobile ? "90vw" : "100%"

  return (
    <>
      <div
        className={`my-5 flex flex-col items-${align} md:items-${align} lg:items-${align}`}
      >
        {generatedCode
          .substring(generatedCode.indexOf("**") + 0)
          .replace(regex, "")
          .replace("javascript", "")
          .replace("python", "")
          .replace("go", "")
          .replace("python", "")
          .replace("html", "")
          .replace("sql", "")
          .replace("jsx", "")
          .replace("tsx", "")
          .split("**::")
          .map((generated, idx) => {
            return (
              <div
                key={idx}
                className="mx-auto flex w-full items-center justify-center overflow-x-auto overflow-y-scroll text-left font-mono sm:items-start sm:justify-start"
              >
                {/* <CopyBlock
                  onCopy={() => null}
                  copied={false}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    minWidth: minWidth,
                    with: "100vw",
                    borderRadius: "0.6rem",
                    border: `0.5px solid ${themeColors.purple[500]}`,
                  }}
                  text={generated.trim()}
                  language={langElement === "Typescript" ? "tsx" : "jsx"}
                  codeBlock
                  theme={{
                    ...dracula,
                    mode: "dark",
                    textColor: "#ffffff",
                    stringColor: themeColors.purple[300],
                    attributeColor: themeColors.purple[300],
                    functionColor: themeColors.mint,
                    templateTagColor: themeColors.moradoCode, //H1 or HTML Tags
                    backgroundColor: themeColors.purple[900],
                    keywordColor: themeColors.moradoCode,
                    metaKeywordColor: "#8283ad",
                    lineNumberColor: themeColors.lineNumbers,
                    metaColor: themeColors.mint,
                  }} 
                  />
                  */}
                <SyntaxHighlighter wrapLines language="javascript" style={dark}>
                  {generated.trim()}
                </SyntaxHighlighter>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default React.memo(GenerateCode)
