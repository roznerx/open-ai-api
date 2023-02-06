import { CopyBlock, dracula } from "react-code-blocks";

type GenerateCode = {
  generatedCode: String;
  langElement: string;
};

export default function GenerateCode({
  generatedCode,
  langElement,
}: GenerateCode) {
  return (
    <>
      <div>
        <h2 className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl">
          Your generated code:
        </h2>
      </div>
      <div className="w-4/4  flex flex-col items-start md:items-center lg:items-center">
        {generatedCode
          .substring(generatedCode.indexOf("**") + 0)
          .split("**::")
          .map((generated) => {
            return (
              <div
                className="flex flex-wrap rounded-xl border bg-white p-4 px-2 text-left font-mono shadow-md transition hover:bg-gray-100"
                key={generated}
              >
                <div className="overflow-x-auto sm:text-left lg:max-w-2xl">
                  <CopyBlock
                    text={generated}
                    language={langElement === "Typescript" ? "tsx" : "jsx"}
                    codeBlock
                    theme={dracula}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
