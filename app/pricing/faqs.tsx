"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronUp } from "lucide-react"

export default function Faqs({ translations: faqs }) {
  // console.log("translations faqs:", translations)
  return (
    <div className="mx-auto w-full px-4 md:w-[990px]">
      <div className="w-full rounded-2xl bg-purple-500 p-2">
        <Disclosure as="div" className="">
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm group flex w-full justify-between rounded-lg bg-purple-800 px-4 py-2 text-left font-medium text-purple-900 hover:bg-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-gray-300 group-hover:text-white">
                  {faqs["1"].title}
                </span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm px-4 pt-4 pb-2 text-center text-gray-200 sm:text-left">
                {faqs["1"].desc}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm group flex w-full justify-between rounded-lg border border-purple-900 bg-purple-800 px-4 py-2 text-left font-medium text-purple-900 hover:bg-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-gray-300 group-hover:text-white">
                  {faqs["2"].title}
                </span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm px-4 pt-4 pb-2 text-center text-gray-200 sm:text-left ">
                {faqs["2"].desc}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm group flex w-full justify-between rounded-lg bg-purple-800 px-4 py-2 text-left font-medium text-purple-900 hover:bg-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-gray-300 group-hover:text-white">
                  {faqs["3"].title}
                </span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm px-4 pt-4 pb-2 text-center text-gray-200 sm:text-left">
                {faqs["3"].desc}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
