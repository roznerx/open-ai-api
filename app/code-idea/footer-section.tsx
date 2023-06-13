import DropDown from "app/components/DropDown"
import Button from "app/components/Button"
import toast, { Toaster } from "react-hot-toast"
import useClipboard from "utils/useClipboard"
import { useState } from "react"
import { Hand, XCircle } from "lucide-react"
import { MaterialTooltip } from "app/components/material-components"

const notify = () => toast("Code copied!")

export default function FooterSection({
  mode,
  setUserHasAResponse,
  setTestFrameworkElement,
  testFrameworkElement,
  testFrameworkElements,
  testLibElement,
  testLibElements,
  clearPanel,
  stopGeneration,
  setTestLib,
  generatedCode,
  langElement,
  langElements,
  loading,
  setLangElement,
  lib,
  libElements,
  setLib,
  onCodeGeneration,
}: any) {
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
              {langElement !== "Python" && (
                <div className={`ml-0 hidden sm:ml-56 sm:block`}>
                  <DropDown
                    bgColor="bg-purple-500"
                    elements={libElements}
                    element={lib}
                    setElement={(newLib) => setLib(newLib)}
                  />
                </div>
              )}
            </>
          )}
          {mode === "test" && (
            <>
              <div className="hidden sm:ml-4 sm:block">
                <DropDown
                  bgColor="bg-purple-500"
                  elements={testFrameworkElements}
                  element={testFrameworkElement}
                  setElement={(item) => setTestFrameworkElement(item)}
                />
              </div>
              {testFrameworkElement !== "Cypress" && (
                <div className={`ml-0 hidden sm:ml-56 sm:block`}>
                  <DropDown
                    bgColor="bg-purple-500"
                    elements={testLibElements}
                    element={testLibElement}
                    setElement={(item) => setTestLib(item)}
                  />
                </div>
              )}
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
        <div className="mx-auto flex items-center gap-48 sm:mr-8 sm:items-center sm:justify-center sm:gap-0">
          <div className="flex">
            <MaterialTooltip
              className="-mt-3  border-[1px] border-gray-500 bg-purple-900  text-gray-200"
              content="Stop Generation"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <div
                onClick={() => stopGeneration()}
                className={`mr-3 h-[40px] w-[40px] cursor-pointer rounded-md bg-purple-500`}
              >
                <Hand
                  width={24}
                  height={24}
                  className="mx-auto mt-2  text-white hover:text-mint"
                />
              </div>
            </MaterialTooltip>
            <MaterialTooltip
              className="-mt-3 border-[1px] border-gray-500 bg-purple-900  text-gray-200"
              content="Clear Pannel"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <div
                data-tooltip-target="clear-pannel"
                onClick={() => clearPanel()}
                className={`mr-3 h-[40px] w-[40px] cursor-pointer rounded-md bg-purple-500`}
              >
                <XCircle
                  width={24}
                  height={24}
                  className="mx-auto mt-2 text-white hover:text-mint"
                />
              </div>
            </MaterialTooltip>
            {/* <MaterialTooltip
              className="-mt-3 border-[1px] border-gray-500 bg-purple-900  text-gray-200"
              content="Copy Code"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
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
            </MaterialTooltip> */}
          </div>
          <div className="mr-4">
            <Button
              onClick={() => {
                onCodeGeneration()
                setUserHasAResponse(false)
              }}
              loading={loading}
              variant="mint"
              text="Generate"
            />
          </div>
        </div>
      </section>
    </>
  )
}
