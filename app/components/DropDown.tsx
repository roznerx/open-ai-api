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
  setElement: (vibe: ElementType) => void
  elements: ElementType[]
}

export default function DropDown({
  elements,
  element,
  setElement,
}: DropDownProps) {
  const ReactIcon = React.memo(() => (
    <Image alt="React JS" src={"/icons/react.png"} width={24} height={24} />
  ))

  const VueJSIcon = React.memo(() => (
    <Image alt="Vue JS" src={"/icons/vue.png"} width={24} height={24} />
  ))
  const AngularIcon = React.memo(() => (
    <Image
      alt="Angular JS"
      src={"/icons/angular.webp"}
      width={24}
      height={24}
    />
  ))
  const TypescriptIcon = React.memo(() => (
    <Image
      alt="Typescript"
      src={"/icons/typescript.png"}
      width={24}
      height={24}
    />
  ))

  const JavascriptIcon = () => (
    <Image alt="Javascript" src={"/icons/JS.svg"} width={24} height={24} />
  )
  console.log("pasa por aqui")
  return (
    <Menu as="div" className="absolute w-44 bg-purple-800 text-left text-white">
      <div>
        <Menu.Button className="shadow-smfocus:outline-none inline-flex w-full items-start justify-between rounded-md border py-2 pl-2 focus:ring-2 focus:ring-black">
          {element === "Javascript" && <JavascriptIcon />}
          {element === "Typescript" && <TypescriptIcon />}
          {element === "React" && <ReactIcon />}
          {element === "Vue" && <VueJSIcon />}
          {element === "Angular" && <AngularIcon />}
          <span className="absolute left-8 ml-1">{element}</span>
          <ChevronUpIcon
            className="mr-1 ml-2 h-5 w-5 ui-open:hidden"
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
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="left-0 z-10 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                      "flex w-full items-start justify-start space-x-2 py-2 pl-2 text-left text-sm",
                    )}
                  >
                    {item === "Javascript" && <JavascriptIcon />}
                    {item === "Typescript" && (
                      <Image
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
