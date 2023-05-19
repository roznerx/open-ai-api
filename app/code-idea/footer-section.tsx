import DropDown from "app/components/DropDown"
import Button from "app/components/Button"
import toast, { Toaster } from "react-hot-toast"
import useClipboard from "utils/useClipboard"
import { useState } from "react"
import { Copy, Save } from "lucide-react"

const notify = () => toast("Code copied!")

export default function FooterSection({
  mode,
  onSaveCode,
  generatedCode,
  langElement,
  libElements,
  langElements,
  loading,
  setLangElement,
  lib,
  setLib,
  onCodeGeneration,
}: any) {
  console.log("Mode", mode)

  const [copied, toggleCopy] = useState(false)
  const { copy } = useClipboard()

  const text =
    generatedCode.length > 0 &&
    generatedCode
      .substring(generatedCode.indexOf("**") + 0)
      .replace("**", "")
      .replace("tsx", "")
      .replace("", "")
      .split("**::")
      .join("")

  const copyHandler = () => {
    copy(text)
    toggleCopy(!copied)
    notify()
  }

  return (
    <>
      <Toaster />
      <section
        className="fixed bottom-0 left-0 z-40 flex h-16 w-[101%] items-center
          justify-between border-t-[1px] border-purple-500 bg-purple-800"
      >
        <div className="mb-10 ml-6 sm:ml-16">
          {mode === "smart" && (
            <>
              <div className="hidden sm:ml-4 sm:block">
                <DropDown
                  bgColor="bg-purple-500"
                  elements={langElements}
                  element={langElement}
                  setElement={(newElement) => setLangElement(newElement)}
                />
              </div>
              <div
                className={`${
                  mode === "smart" ? "block" : "hidden"
                } ml-0 sm:ml-52 sm:block`}
              >
                <DropDown
                  bgColor="bg-purple-500"
                  elements={libElements}
                  element={lib}
                  setElement={(newLib) => setLib(newLib)}
                />
              </div>
            </>
          )}
          {/* <div
            onClick={onSaveCode}
            className="absolute hidden h-[40px] w-[40px] cursor-pointer rounded-md bg-purple-500 sm:left-[470px] sm:bottom-[10.5px] sm:block"
          >
            <Save
              width={24}
              height={24}
              className="mx-auto mt-2 text-white hover:text-mint"
            />
          </div> */}
        </div>
        <div className="mr-8 flex">
          <div
            onClick={() => copyHandler()}
            className={`mr-3 h-[40px] w-[40px] cursor-pointer rounded-md bg-purple-500`}
          >
            <Copy
              width={24}
              height={24}
              className="mx-auto mt-2 text-white hover:text-mint"
            />
          </div>
          <Button
            onClick={onCodeGeneration}
            loading={loading}
            variant="mint"
            text="Generate"
          />
        </div>
      </section>
    </>
  )
}
