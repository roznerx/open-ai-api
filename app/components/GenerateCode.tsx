import { CopyBlock, dracula } from "react-code-blocks"
import tailwindConfig from "tailwind.config.js"
import Button from "./Button"

type GenerateCode = {
  generatedCode: String
  langElement?: string
  align?: string
  onSaveCode?: () => void
}

const colors: any = tailwindConfig.theme?.extend?.colors

export default function GenerateCode({
  align = "center",
  onSaveCode,
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
                  customStyle={{ borderRadius: "0.625rem" }}
                  text={generated}
                  language={langElement === "Typescript" ? "tsx" : "jsx"}
                  codeBlock
                  theme={{
                    ...dracula,
                    backgroundColor: "#28273D",
                    metaColor: colors.mint,
                  }}
                />
                <div className="absolute bottom-12 right-4 hidden sm:block">
                  <Button
                    hidden={false}
                    onClick={() => onSaveCode && onSaveCode()}
                    variant="mint"
                    loading={false}
                    text="Save Code"
                  />
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
