"use client"

import { Dialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"

import Link from "next/link"
import { Fragment } from "react"
type DialogProps = {
  isOpen: boolean
  isPromptModal?: boolean
  isCreditsModal?: boolean
  isLiveDemoModal?: boolean
  body: string | JSX.Element
  propmptName?: string
  buttonLink?: string
  title?: string
  handleInputChange?: (e: any) => void
  onClickPrimary?: () => void
  onSave?: () => void
  savePropmptName?: boolean
  buttonText?: string
  setIsOpen: (arg: boolean) => void
}
export default function MyModal({
  onClickPrimary,
  isOpen,
  onSave,
  title,
  isCreditsModal,
  buttonLink,
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
          className="relative z-50"
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
          <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500/60">
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
                    isLiveDemoModal ? "w-[65%]" : "max-w-xl"
                  } transform overflow-hidden rounded-2xl bg-purple-700 p-10 text-center align-middle shadow-xl transition-all`}
                >
                  <X
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="absolute right-3 top-2 cursor-pointer rounded-full border border-none"
                    size={20}
                    color="white"
                  />
                  {isCreditsModal && (
                    <Dialog.Title
                      as="h1"
                      className="mx-auto w-[80%] p-4 font-sans text-2xl font-medium text-white"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  <Dialog.Title
                    as="div"
                    className="text-md mx-auto -mt-3 w-full p-4 font-sans leading-6 text-white"
                  >
                    {body}
                  </Dialog.Title>
                  {isPromptModal && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {savePropmptName && (
                          <input
                            className="focus:shadow-outline leading-tightb w-full appearance-none rounded border-none bg-purple-800 px-3 py-2 text-gray-300 shadow focus:outline-none "
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
                  <div className="mt-4 flex justify-end">
                    {!buttonLink ? (
                      <button
                        type="button"
                        className="text-sm mx-auto inline-flex min-w-[125px] justify-center rounded-md border border-transparent bg-mint px-10 py-2 font-sans font-medium text-black/90 focus:outline-none  "
                        onClick={() => {
                          setIsOpen(false)
                          if (typeof onSave === "function") {
                            onSave()
                          }
                          if (typeof onClickPrimary === "function") {
                            onClickPrimary()
                          }
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : (
                      <Link
                        href={buttonLink}
                        className="text-sm w-auto rounded-md border border-transparent bg-mint/80 px-5 py-3 font-medium text-black/90 hover:bg-mint hover:text-purple-900 focus:outline-none "
                        onClick={() => {
                          setIsOpen(false)
                        }}
                      >
                        {buttonText}
                        {/* <Rocket
                          color="#000"
                          className="ml-2 inline-block"
                          size={20}
                        /> */}
                      </Link>
                    )}
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
