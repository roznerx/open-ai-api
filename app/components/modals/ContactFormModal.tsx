"use client"

import { Dialog, Transition } from "@headlessui/react"
import Loading from "app/suspenseLoading"
import { X } from "lucide-react"
import { Inter } from "next/font/google"
import { Fragment, useState } from "react"

interface Props {
  isOpen: boolean
  thanksMessage?: boolean
  isClientFeedback?: boolean
  clientName?: string
  errorMessage?: Error
  title?: string
  name?: string
  purchasedCredits?: string
  setIsOpen: (arg: boolean) => void
}

type FormValues = {
  workEmail: string
  name: string
  numberOfLicenses: number
}

const initialFormValues: FormValues = {
  name: "",
  workEmail: "",
  numberOfLicenses: 10,
}

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
})

export default function ContactFormModal({
  title,
  name,
  isClientFeedback,
  errorMessage,
  isOpen,
  setIsOpen,
  purchasedCredits,
  clientName,
  thanksMessage,
}: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [message, setMessage] = useState<string>("")
  const [loading, setIsLoading] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const payload = {
      name: formValues.name,
      contactEmail: formValues.workEmail,
      message,
    }
    //Using Fetch, post to API api/email/send.ts and pass name, contactEmail, message in the body as a payload
    const res = await fetch("/api/email/send", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setIsLoading(false)
      setIsDone(true)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
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
        <div
          className={`${inter.variable} fixed inset-0 overflow-y-auto font-sans`}
        >
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
                className={
                  "w-[100%] transform overflow-hidden rounded-2xl bg-purple-500 p-4 text-left shadow-xl transition-all md:h-full md:w-[90%] lg:h-fit lg:w-[40%]"
                }
              >
                <div
                  className="relative block cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={25} className="absolute right-3" color="white" />
                </div>
                <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:p-12">
                  {loading && !thanksMessage && (
                    <>
                      <Dialog.Title
                        as="h1"
                        className="font-poppins mx-auto text-center text-2xl  text-white "
                      >
                        Sending message..
                      </Dialog.Title>
                    </>
                  )}
                  {!loading && !isDone && !thanksMessage && (
                    <>
                      <Dialog.Title
                        as="h1"
                        className="font-poppins text-center text-2xl leading-6 text-white sm:text-left sm:text-3xl"
                      >
                        {title ? title : `Talk to an expert`}
                      </Dialog.Title>
                      <Dialog.Title
                        as="h1"
                        className={`text-sm sm:text-md text-center font-sans leading-10 text-gray-200 sm:text-left`}
                      >
                        {isClientFeedback
                          ? `This is the error message descriptoin:`
                          : `We will be happy to answer all your questions`}
                      </Dialog.Title>

                      <hr className="border-1 border-purple-500" />
                      {/* Contact Form */}
                      <form className="flex flex-col gap-4">
                        {!isClientFeedback && (
                          <>
                            <div className="flex flex-col gap-2">
                              <label
                                htmlFor="name"
                                className="font-sans text-[13px] text-purple-300"
                              >
                                Name
                              </label>
                              <input
                                name="name"
                                id="name"
                                autoComplete="off"
                                className="w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:outline-0"
                                placeholder={name}
                                value={name ? name : formValues.name}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label
                                htmlFor="workEmail"
                                className="font-sans text-[13px] text-purple-300"
                              >
                                Email
                              </label>
                              <input
                                name="workEmail"
                                id="workEmail"
                                autoComplete="off"
                                className="w-fullrounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:outline-0 focus:ring-purple-400"
                                placeholder=""
                                value={formValues.workEmail}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="flex-grow-1 flex flex-col gap-2">
                              <label
                                htmlFor="howCanWeHelp"
                                className="font-sans text-[13px] text-purple-300"
                              >
                                Message
                              </label>
                              <textarea
                                name="howCanWeHelp"
                                id="howCanWeHelp"
                                className="block w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-[13px] placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-400"
                                placeholder="Tell us about your business needs"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value)
                                }}
                                required
                              />
                            </div>
                          </>
                        )}

                        {isClientFeedback && (
                          <div className="font-mono text-gray-200">
                            <textarea
                              name="howCanWeHelp"
                              id="howCanWeHelp"
                              className="block w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-[13px] placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-400"
                              value={errorMessage && errorMessage.toString()}
                              onChange={(e) => {
                                setMessage(e.target.value)
                              }}
                              required
                            />
                          </div>
                        )}
                        <div className="mt-4 flex flex-row justify-end gap-4 sm:items-center ">
                          <div className="basis-5/4">
                            <button
                              type="submit"
                              onClick={(e) => handleSubmit(e)}
                              className="w-full rounded-md border-2 border-transparent bg-mint px-10 py-3 font-sans text-black"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {loading && <Loading />}
                  {isDone && !thanksMessage && (
                    <div className="flex flex-col items-center justify-center">
                      <Dialog.Title
                        as="h1"
                        className="text-center text-2xl leading-6 text-white sm:text-left sm:text-3xl"
                      >
                        <span className="capitalize">
                          {formValues.name.trim() !== ""
                            ? formValues.name
                            : clientName}
                        </span>
                      </Dialog.Title>
                      {!isClientFeedback ? (
                        <>
                          <p className="text-sm mt-4 text-white">
                            Talks for being interested in Code Genius.
                          </p>
                          <p className="text-sm -mt-1 text-white">
                            An expert will reach you soon.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm mt-4 text-white">
                            Talks for being part of the Code Genius community.
                          </p>
                          <p className="text-sm -mt-1 text-white">
                            We appreciate your help and interest.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  {thanksMessage && (
                    <div className="flex w-full flex-col items-center justify-center font-sans">
                      <Dialog.Title
                        as="h3"
                        className="relative text-2xl leading-6 text-white sm:text-left sm:text-3xl"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="-mt-6 text-3xl">
                            Thank you,{" "}
                            <span className="font-semibold">{clientName}</span>!
                          </span>
                          {/* {clientName && (
                            <span className="mt-2">{clientName}!</span>
                          )} */}
                        </div>
                      </Dialog.Title>
                      <p className="text-sm w-[65%] pt-8 text-center text-white">
                        You have now {purchasedCredits} credits extra to create
                        with Code Genius.
                      </p>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
