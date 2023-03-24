import { CopyBlock, dracula, codepen } from "react-code-blocks"
import tailwindConfig from "tailwind.config.js"

type GenerateCode = {
  generatedCode: String
  langElement?: string
  align?: string
}

const colors: any = tailwindConfig.theme?.extend?.colors

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
                  theme={{
                    ...dracula,
                    backgroundColor: "#28273D",
                    metaColor: colors.mint,
                  }}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}
