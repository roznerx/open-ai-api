"use client"

import { Dialog, Transition } from "@headlessui/react"
import { ChangeEventHandler, Fragment } from "react"
type DialogProps = {
  isOpen: boolean
  isPromptModal?: boolean
  isLiveDemoModal?: boolean
  body: string | JSX.Element
  propmptName?: string
  handleInputChange?: (e: any) => void
  onSave?: () => void
  savePropmptName?: boolean
  buttonText?: string
  setIsOpen: (arg: boolean) => void
}
export default function MyModal({
  isOpen,
  onSave,
  setIsOpen,
  propmptName,
  isPromptModal = false,
  isLiveDemoModal = false,
  savePropmptName = false,
  handleInputChange,
  body,
  buttonText = "Save",
}: DialogProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-gray-500/60 ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${
                    isLiveDemoModal ? "w-[65%]" : "max-w-md"
                  } transform  overflow-hidden rounded-2xl bg-purple-700 p-6 text-center align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="font-popinstext-md font-popins font-medium leading-6 text-white"
                  >
                    {body}
                  </Dialog.Title>
                  {isPromptModal && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {savePropmptName && (
                          <input
                            className="focus:shadow-outline leading-tightb w-full appearance-none rounded border-none bg-purple-800 py-2 px-3 text-gray-300 shadow focus:outline-none "
                            value={propmptName}
                            onChange={handleInputChange}
                            id="question-name"
                            type="text"
                            placeholder="Question name"
                          ></input>
                        )}
                        {!savePropmptName && "Please try again"}
                      </p>
                    </div>
                  )}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-sm inline-flex min-w-[145px] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false)
                        if (typeof onSave === "function") {
                          onSave()
                        }
                      }}
                    >
                      {buttonText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
