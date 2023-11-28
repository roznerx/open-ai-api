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
      <div className="mx-auto flex w-16 flex-col duration-100 hover:sm:w-60 ">
        <div
          className={`mt-4 flex h-12 w-full items-center justify-center p-2 hover:w-[90%] group-hover:ml-4 group-hover:justify-start`}
        >
          <Link href="/" className="font-semibold group-hover:inline-flex">
            <Image
              src={"/logo/code-genius.svg"}
              width={32}
              height={32}
              alt="Code Genius"
            />
            {/* <span className="ml-3 hidden pt-2 text-white group-hover:inline-flex">
              Code Genius
            </span> */}
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md p-2 hover:w-[90%] hover:bg-purple-500 group-hover:ml-4 group-hover:justify-start">
          <Link href="/dashboard" className="group-hover:inline-flex">
            <LayoutDashboard
              width={26}
              height={26}
              color={pathname === "/dashboard" ? colors.mint : "white"}
            />
            <span className="ml-3 hidden text-white group-hover:block">
              {translations?.dashboard}{" "}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md p-2 hover:w-[90%] hover:bg-purple-500 group-hover:ml-4 group-hover:items-center group-hover:justify-start ">
          <Link
            href="/code-idea?mode=smart"
            className="group-hover:inline-flex "
          >
            <Code size={26} color={mode === "smart" ? colors.mint : "white"} />
            <span className="ml-3 hidden text-white group-hover:block">
              {translations?.suggestions}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md p-2 hover:w-[90%] hover:bg-purple-500 group-hover:ml-4  group-hover:items-center group-hover:justify-start ">
          <Link
            href="/code-idea?mode=test"
            className="group-hover:inline-flex "
          >
            <CurlyBraces
              size={25}
              color={mode === "test" ? colors.mint : "white"}
            />
            <span className="ml-3 hidden text-white group-hover:block">
              {translations?.testing}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md p-2 hover:w-[90%] hover:bg-purple-500 group-hover:ml-4 group-hover:items-center group-hover:justify-start ">
          <Link
            href="/code-idea?mode=improve"
            className="group-hover:inline-flex"
          >
            <Rocket
              size={26}
              color={mode === "improve" ? colors.mint : "white"}
            />
            <span className="ml-3 hidden text-white group-hover:block">
              {translations?.optimization}
            </span>
          </Link>
        </div>

        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md p-2 hover:w-[90%] hover:bg-purple-500 group-hover:ml-4  group-hover:items-center group-hover:justify-start ">
          <Link
            href="/code-idea?mode=docs"
            className="group-hover:inline-flex "
          >
            <FileCode
              size={26}
              color={mode === "docs" ? colors.mint : "white"}
            />
            <span className="ml-3 hidden text-white group-hover:block">
              {translations?.docs}
            </span>
          </Link>
        </div>
        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md p-2 hover:w-[90%] hover:bg-purple-500 group-hover:ml-4 group-hover:items-center group-hover:justify-start ">
          <Link href="/code-chat" className="group-hover:inline-flex">
            <MessageSquare
              size={26}
              color={pathname === "/code-chat" ? colors.mint : "white"}
            />
            <span className="ml-3 hidden text-white group-hover:block">
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
