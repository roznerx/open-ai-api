"use client"

import useWindowSize from "hooks/use-window-size"
import {
  MessageSquare,
  LayoutDashboard,
  Rocket,
  CurlyBraces,
  Code,
  FileCode,
} from "lucide-react"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React from "react"
import tailwindConfig from "tailwind.config"
import MobileSideBar from "./MobileSideBar"
import Image from "next/image"

const SideBar = ({
  translations,
  menuTranslations,
}: {
  translations: any
  menuTranslations: any
}) => {
  const searchParams = useSearchParams()

  const mode = searchParams && searchParams.get("mode")
  console.log("mode:", mode)

  const pathname = usePathname()

  const { isMobile } = useWindowSize()
  const colors: any = tailwindConfig.theme?.extend?.colors

  const shouldHideSideBar =
    pathname === "/" ||
    pathname === "/pricing" ||
    pathname === "/blog" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/privacy"

  return !isMobile ? (
    <div
      id="sidebar"
      className={`group z-50 min-h-screen border-r-[1px] border-purple-400 bg-purple-800 
      sm:flex  ${shouldHideSideBar ? "sm:hidden" : "sm:relative"} `}
    >
      <div className="mx-auto flex w-16 flex-col justify-start pl-2  hover:w-56">
        <div className=" mt-4 flex h-12 cursor-pointer  rounded-md p-2 hover:bg-purple-500 ">
          <Link href="/" className="inline-flex ">
            <Image
              src={"/logo/code-genius.svg"}
              width={32}
              height={32}
              alt="Code Genius"
            />
            <p className="ml-8 flex-grow text-2xl font-normal text-white opacity-0 group-hover:opacity-100">
              Code
            </p>
            <p className="ml-2 flex-grow text-2xl font-normal text-white opacity-0 group-hover:opacity-100">
              Genius
            </p>
          </Link>
        </div>

        <div className=" mt-4 flex h-12 w-full cursor-pointer rounded-md p-2 hover:bg-purple-500 ">
          <Link href="/dashboard" className="inline-flex">
            <LayoutDashboard
              width={26}
              height={26}
              color={pathname === "/dashboard" ? colors.mint : "white"}
            />
            <p className="ml-10 pt-0.5 font-normal text-white opacity-0 group-hover:opacity-100">
              {translations?.dashboard}{" "}
            </p>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer rounded-md p-2 hover:bg-purple-500   ">
          <Link href="/code-idea?mode=smart" className="inline-flex ">
            <Code size={26} color={mode === "smart" ? colors.mint : "white"} />
            <span className="ml-10 pt-0.5 font-normal text-white opacity-0 group-hover:opacity-100">
              {translations?.suggestions}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer rounded-md p-2 hover:bg-purple-500    ">
          <Link href="/code-idea?mode=test" className="inline-flex ">
            <CurlyBraces
              size={25}
              color={mode === "test" ? colors.mint : "white"}
            />
            <span className="ml-10 pt-0.5 font-normal text-white opacity-0 group-hover:opacity-100">
              {translations?.testing}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer rounded-md p-2 hover:bg-purple-500   ">
          <Link href="/code-idea?mode=improve" className="inline-flex">
            <Rocket
              size={26}
              color={mode === "improve" ? colors.mint : "white"}
            />
            <span className="ml-10 pt-0.5 font-normal text-white opacity-0 group-hover:opacity-100">
              {translations?.optimization}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer rounded-md p-2  hover:bg-purple-500    ">
          <Link href="/code-idea?mode=docs" className="inline-flex ">
            <FileCode
              size={26}
              color={mode === "docs" ? colors.mint : "white"}
            />
            <span className="ml-10 pt-0.5 font-normal text-white opacity-0 group-hover:opacity-100">
              {translations?.docs}
            </span>
          </Link>
        </div>
        <div className="mt-4 flex h-12 w-full cursor-pointer rounded-md p-2 hover:bg-purple-500   ">
          <Link href="/code-chat" className="inline-flex">
            <MessageSquare
              size={26}
              color={pathname === "/code-chat" ? colors.mint : "white"}
            />
            <span className="ml-10 pt-0.5 font-normal text-white opacity-0 group-hover:opacity-100">
              {translations?.chat}
            </span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <MobileSideBar
      translations={menuTranslations}
      pathname={pathname}
      mode={mode}
      colors={colors}
    />
  )
}

export default SideBar
