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
        className={`w-4/4 flex flex-col items-${align} md:items-${align} lg:items-${align}`}
      >
        {generatedCode
          .substring(generatedCode.indexOf("**") + 0)
          .split("**::")
          .map((generated) => {
            return (
              <div
                className="flex flex-wrap rounded-xl border bg-white  text-left font-mono shadow-md transition hover:bg-gray-100"
                key={generated}
              >
                <div className="overflow-x-auto sm:text-left lg:max-w-2xl">
                  <CopyBlock
                    showLineNumbers
                    text={generated}
                    language={langElement === "Typescript" ? "tsx" : "jsx"}
                    codeBlock
                    theme={dracula}
                  />
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
