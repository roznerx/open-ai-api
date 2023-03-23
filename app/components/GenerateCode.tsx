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
          .substring(generatedCode.indexOf("**") + 1)
          .split("**::")
          .map((generated) => {
            return (
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  background: "#28273D",
                  color: "white",
                  paddingBottom: "1rem",
                }}
              >
                <CopyBlock
                  customStyle={{
                    height: "auto",
                    overflowY: "scroll",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    margin: "0px 0.75rem",
                  }}
                  theme={dracula}
                  showLineNumbers
                  text={generated}
                  language={langElement === "Typescript" ? "tsx" : "jsx"}
                  codeBlock
                />
              </div>
            )
          })}
      </div>
    </>
  )
}
