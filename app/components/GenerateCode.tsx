import { CopyBlock, dracula } from "react-code-blocks"

type GenerateCode = {
  generatedCode: String
  langElement?: string
  align?: string
}

export default function GenerateCode({
  align = "center",
  generatedCode,
  langElement,
}: GenerateCode) {
  return (
    <>
      <div
        className={`my-2 flex flex-col items-${align} md:items-${align} lg:items-${align}`}
      >
        {generatedCode
          .substring(generatedCode.indexOf("**") + 0)
          .split("**::")
          .map((generated) => {
            return (
              <div className="w-full text-left">
                <CopyBlock
                  showLineNumbers
                  text={generated}
                  language={langElement === "Typescript" ? "tsx" : "jsx"}
                  codeBlock
                  theme={dracula}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}
