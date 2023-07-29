"use client"

import { Dialog, Transition } from "@headlessui/react"
import { ArrowLeft } from "lucide-react"
import { Inter } from "next/font/google"
import { Fragment, useEffect, useState } from "react"

interface Props {
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
}

type FormValues = {
  cardNumber: string
  name: string
  expires: string
  cvc: string
}

const initialFormValues: FormValues = {
  name: "",
  cvc: "",
  expires: "",
  cardNumber: "",
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
})

export default function PaymentModal({ isOpen, setIsOpen }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

  useEffect(() => {
    const headerId = document.getElementById("site-header")
    if (isOpen) {
      //use the header id to hidde the element
      headerId?.classList.add("hidden")
    } else {
      headerId?.classList.remove("hidden")
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
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
          className={`${inter.variable} font-inter fixed inset-0 overflow-y-auto`}
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
                  "w-[100%] transform overflow-hidden rounded-2xl bg-purple-600 p-4 text-left shadow-xl transition-all md:h-full md:w-[90] lg:h-fit lg:w-[504.01px]"
                }
              >
                <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:p-12">
                  <div
                    className="relative block cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <ArrowLeft size={25} color="white" />
                  </div>
                  <Dialog.Title
                    as="h1"
                    className="font-poppins text-center text-2xl leading-6 text-white sm:text-left sm:text-3xl"
                  >
                    Add Payment
                  </Dialog.Title>
                  <Dialog.Title
                    as="h1"
                    className={`text-xs sm:text-lg font-inter text-center leading-10 text-gray-200 sm:text-left`}
                  >
                    Add your Card Information to continue:
                  </Dialog.Title>
                  <hr className="border-1 border-purple-500" />
                  {/* Credit Card Info Form */}
                  <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="nameOnCard"
                        className="font-inter text-[13px] text-purple-300"
                      >
                        Name on Card
                      </label>
                      <input
                        name="nameOnCard"
                        id="nameOnCard"
                        className="w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
                        placeholder="John Doe"
                        maxLength={16}
                        value={formValues.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="cardNumber"
                        className="font-inter text-[13px] text-purple-300"
                      >
                        Card Number
                      </label>
                      <input
                        name="cardNumber"
                        id="cardNumber"
                        className="w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
                        placeholder="1234 1234 1234 1234"
                        maxLength={16}
                        value={formValues.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:justify-end">
                      <div className="flex-grow-1 flex flex-col gap-2">
                        <label
                          htmlFor="expires"
                          className="font-inter text-[13px] text-purple-300"
                        >
                          Expires
                        </label>
                        <input
                          name="expires"
                          id="expires"
                          className="font-inter block w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={formValues.expires}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex-grow-1 flex flex-col gap-2">
                        <label
                          htmlFor="cvc"
                          className="font-inter text-[13px] text-purple-300"
                        >
                          CVC
                        </label>
                        <input
                          name="cvc"
                          id="cvc"
                          className="block w-full rounded-md border border-purple-500 bg-purple-700 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
                          placeholder="123"
                          maxLength={3}
                          value={formValues.cvc}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-row justify-end gap-4 sm:items-center ">
                      <div className="basis-5/4">
                        <button
                          type="submit"
                          className="font-inter w-full rounded-md border-2 border-transparent bg-mint px-10 py-3 text-black"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
