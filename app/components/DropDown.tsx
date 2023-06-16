import { Menu, Transition } from "@headlessui/react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import Image from "next/image"
import React, { Fragment } from "react"
import {
  AngularIcon,
  Chai,
  Cypress,
  Enzyme,
  Jasmine,
  JavascriptIcon,
  Jest,
  Mocha,
  Python,
  ReactIcon,
  RTL,
  TypescriptIcon,
  VueJSIcon,
} from "./shared/lib-icons"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export type LandElementType =
  | "Language"
  | "UI Library"
  | "Typescript"
  | "Javascript"
  | "Python"
  | "React"
  | "Vue"
  | "Angular"

export type TestingElementType =
  | "Jest"
  | "Mocha"
  | "Cypress"
  | "Chai"
  | "Jasmine"
  | "Testing Tool"

export type libTestingElementType =
  | "React Testing"
  | "Chai"
  | "Testing Library"
  | "Enzyme"

interface DropDownProps {
  element: LandElementType | TestingElementType | libTestingElementType
  bgColor?: string
  testFrameworkElement?: string
  // eslint-disable-next-line unused-imports/no-unused-vars
  setElement: (item) => void
  elements: LandElementType[] | TestingElementType[] | libTestingElementType[]
}

export default function DropDown({
  bgColor,
  elements,
  element,
  setElement,
}: DropDownProps) {
  return (
    <Menu
      as="div"
      className={`absolute w-32 rounded-lg  sm:w-48 ${
        bgColor ? bgColor : "bg-purple-800"
      } cursor-pointer text-left font-sans text-white shadow-md `}
    >
      <Menu.Button
        as="div"
        className="inline-flex w-full justify-between border-none py-2 shadow-sm  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <div className="ml-2 inline-flex">
          {element === "Javascript" && <JavascriptIcon />}
          {element === "Cypress" && <Cypress />}
          {element === "Typescript" && <TypescriptIcon />}
          {element === "Python" && <Python />}
          {element === "React" && <ReactIcon />}
          {element === "Vue" && <VueJSIcon />}
          {element === "Angular" && <AngularIcon />}
          {element === "React Testing" && <RTL />}
          {element === "Chai" && <Chai />}
          {element === "Jest" && <Jest />}
          {element === "Jasmine" && <Jasmine />}
          {element === "Enzyme" && <Enzyme />}
          {element === "Mocha" && <Mocha />}
          <span className="ml-3">{element}</span>
        </div>
        <div className="pr-2">
          <ChevronUp
            className="mr-2 ml-2 h-5 w-5 ui-open:hidden sm:mr-1"
            aria-hidden="true"
          />
          <ChevronDown
            className="mr-1 ml-2 hidden h-5 w-5 ui-open:block"
            aria-hidden="true"
          />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 -top-2 z-10 w-full origin-top-right -translate-y-full transform divide-y rounded-lg  bg-white shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none"
          key={element}
        >
          <div className="">
            {elements.map((item) => (
              <Menu.Item key={item}>
                {({ active }) => (
                  <button
                    onClick={() => setElement(item)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      element === item ? "bg-gray-200" : "",
                      "text-sm flex w-full items-start justify-start space-x-2 py-2 pl-2 text-left",
                    )}
                  >
                    {item === "Javascript" && <JavascriptIcon />}
                    {item === "Python" && <Python />}
                    {item === "Typescript" && (
                      <Image
                        loading="eager"
                        alt="Typescript"
                        src={"/icons/typescript.png"}
                        width={24}
                        height={24}
                      />
                    )}
                    {item === "React" && <ReactIcon />}
                    {item === "Cypress" && <Cypress />}
                    {item === "Vue" && <VueJSIcon />}
                    {item === "Angular" && <AngularIcon />}
                    {item === "React Testing" && <RTL />}
                    {item === "Chai" && <Chai />}
                    {item === "Jest" && <Jest />}
                    {item === "Mocha" && <Mocha />}
                    {item === "Jasmine" && <Jasmine />}
                    {item === "Enzyme" && <Enzyme />}

                    <span>{item}</span>
                    {element === item ? (
                      <div className="absolute right-2 pt-1">
                        <Check className="text-bold h-4 w-4 " />
                      </div>
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
