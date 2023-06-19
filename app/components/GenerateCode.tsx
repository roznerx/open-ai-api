"use client"

import useWindowSize from "hooks/use-window-size"
import React from "react"
import { CopyBlock, dracula } from "react-code-blocks"
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
  const minWidth = isMobile ? "90vw" : "850px"

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
          .replace("html", "")
          .replace("sql", "")
          .replace("typescript", "")
          .replace("jsx", "")
          .replace("tsx", "")
          .split("**::")
          .map((generated, idx) => {
            return (
              <div
                key={idx}
                className="mx-auto flex w-[100%] max-w-[100%] items-center justify-center overflow-x-auto overflow-y-scroll text-left font-mono sm:max-w-[100%]"
              >
                <CopyBlock
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    maxWidth: minWidth,
                    minWidth: minWidth,
                    with: "95vw",
                    borderRadius: "0.6rem",
                    border: `0.5px solid ${themeColors.purple[500]}`,
                  }}
                  text={generated.trim()}
                  language={langElement === "Typescript" ? "tsx" : "jsx"}
                  codeBlock
                  theme={{
                    ...dracula,
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
              </div>
            )
          })}
      </div>
    </>
  )
}

export default React.memo(GenerateCode)
