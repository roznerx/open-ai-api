"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Poppins } from "next/font/google"
import { Fragment, useState } from "react"

interface Props {
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
}

type FormValues = {
  cardNumber: string
  expires: string
  cvc: string
}

const initialFormValues: FormValues = {
  cardNumber: "",
  expires: "",
  cvc: "",
}

const popins = Poppins({
  variable: "--font-popins",
  weight: ["100", "300", "600"],
})

// const roboto = Roboto_Mono({
//   variable: "--font-roboto",
// })

export default function PaymentModal({ isOpen, setIsOpen }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

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
          className={`${popins.variable} fixed inset-0 overflow-y-auto font-popins`}
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
                  "w-[100%] transform overflow-hidden rounded-2xl bg-purple-400 p-4 text-left shadow-xl transition-all md:h-full md:w-[90] lg:h-[487px] lg:w-[504.01px]"
                }
              >
                <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:p-12">
                  <Dialog.Title
                    as="h1"
                    className="font-poppins text-center text-2xl leading-6 text-white sm:text-left sm:text-3xl"
                  >
                    Add Payment
                  </Dialog.Title>
                  <Dialog.Title
                    as="h1"
                    className={`text-xs font-mono leading-10 text-gray-200 sm:text-2xl`}
                  >
                    Add your Card Information to continue:
                  </Dialog.Title>
                  <hr className="border-1 border-purple-500" />
                  {/* Credit Card Info Form */}
                  <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="cardNumber"
                        className="font-mono text-[12px] text-purple-300"
                      >
                        Card Number
                      </label>
                      <input
                        name="cardNumber"
                        id="cardNumber"
                        className="w-full rounded-md bg-purple-500 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
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
                          className="font-mono text-[12px] text-purple-300"
                        >
                          Expires
                        </label>
                        <input
                          name="expires"
                          id="expires"
                          className="block w-full rounded-md bg-purple-500 p-3 font-mono text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
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
                          className="font-mono text-[12px] text-purple-300"
                        >
                          CVC
                        </label>
                        <input
                          name="cvc"
                          id="cvc"
                          className="block w-full rounded-md bg-purple-500 p-3 text-white placeholder:text-purple-300 focus:border-purple-500 focus:ring-purple-400"
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
                        <button className="w-full rounded-md border-2 border-purple-500 bg-transparent px-2 py-3 font-mono text-white">
                          Cancel
                        </button>
                      </div>
                      <div className="basis-5/4">
                        <button
                          type="submit"
                          className="w-full rounded-md border-2 border-transparent bg-mint px-2 py-3 font-mono text-black"
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
