import { Menu, Transition } from "@headlessui/react"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid"
import Image from "next/image"
import React, { Fragment } from "react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export type ElementType =
  | "Typescript"
  | "Javascript"
  | "React"
  | "Vue"
  | "Angular"

interface DropDownProps {
  element: ElementType
  bgColor?: string
  setElement: (vibe: ElementType) => void
  elements: ElementType[]
}

export default function DropDown({
  bgColor,
  elements,
  element,
  setElement,
}: DropDownProps) {
  const ReactIcon = React.memo(() => (
    <Image
      loading="eager"
      alt="React JS"
      src={"/icons/react.png"}
      width={24}
      height={24}
    />
  ))

  const VueJSIcon = React.memo(() => (
    <Image
      loading="eager"
      alt="Vue JS"
      src={"/icons/vue.png"}
      width={24}
      height={24}
    />
  ))

  const AngularIcon = React.memo(() => (
    <Image
      loading="eager"
      alt="Angular JS"
      src={"/icons/angular.webp"}
      width={24}
      height={24}
    />
  ))

  const TypescriptIcon = React.memo(() => (
    <Image
      loading="eager"
      alt="Typescript"
      src={"/icons/typescript.png"}
      width={24}
      height={24}
    />
  ))

  const JavascriptIcon = () => (
    <Image
      loading="eager"
      alt="Javascript"
      src={"/icons/JS.svg"}
      width={24}
      height={24}
    />
  )

  return (
    <Menu
      as="div"
      className={`absolute w-32 rounded-lg sm:w-44 ${
        bgColor ? bgColor : "bg-purple-800"
      }  text-left text-white`}
    >
      <div>
        <Menu.Button className="shadow-smfocus:outline-none inline-flex w-full items-start justify-between border-none py-2 pl-2 focus:ring-2 focus:ring-black">
          {element === "Javascript" && <JavascriptIcon />}
          {element === "Typescript" && <TypescriptIcon />}
          {element === "React" && <ReactIcon />}
          {element === "Vue" && <VueJSIcon />}
          {element === "Angular" && <AngularIcon />}
          <span className="absolute left-8 ml-1">{element}</span>
          <ChevronUpIcon
            className="mr-2 ml-2 h-5 w-5 ui-open:hidden sm:mr-1"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="mr-1 ml-2 hidden h-5 w-5 ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

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
          className="absolute left-0 -top-2 z-10 w-full origin-top-right -translate-y-full transform divide-y rounded-lg  bg-white shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-none focus:outline-none"
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
                    {item === "Vue" && <VueJSIcon />}
                    {item === "Angular" && <AngularIcon />}
                    <span>{item}</span>
                    {element === item ? (
                      <CheckIcon className="text-bold h-4 w-4" />
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
