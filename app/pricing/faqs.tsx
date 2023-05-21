"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronUp } from "lucide-react"

export default function Example() {
  return (
    <div className="mx-auto w-[90%] px-4 pt-16 md:w-[60%] lg:w-[70%]">
      <div className="mx-auto w-full rounded-2xl bg-purple-500 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm flex w-full justify-between rounded-lg border border-purple-900 bg-purple-800 px-4 py-2 text-left font-medium text-purple-900 hover:bg-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-white">
                  How is credit consumption calculated?
                </span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm px-4 pt-4 pb-2 text-gray-200 ">
                Two API calls represent one credit, no matter how many tokens
                those API calls consume. If an API response has less than 10
                tokens (ten words) we do not count it.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm flex w-full justify-between rounded-lg bg-purple-800 px-4 py-2 text-left font-medium text-purple-900 hover:bg-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-white">
                  Can I try Code Genius for free?
                </span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm px-4 pt-4 pb-2 text-gray-200">
                Yes. All newly registered users get 25 free-of-charge credits to
                test the application.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm flex w-full justify-between rounded-lg bg-purple-800 px-4 py-2 text-left font-medium text-purple-900 hover:bg-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-white">
                  Do you offer technical support?
                </span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm px-4 pt-4 pb-2 text-gray-200">
                Yes. All users who have purchased credits have technical
                support.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
