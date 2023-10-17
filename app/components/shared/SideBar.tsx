"use client"

import useWindowSize from "hooks/use-window-size"
import {
  MessageSquare,
  LayoutDashboard,
  Rocket,
  CurlyBraces,
  Code,
  FileCode,
  Users,
} from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import tailwindConfig from "tailwind.config"
import { MaterialTooltip } from "../material-components"
import MobileSideBar from "./MobileSideBar"

const SideBar = ({
  translations,
  menuTranslations,
  mode,
  setGeneratedCode,
}: {
  translations: any
  menuTranslations: any
  mode?: string
  setMode?: any
  setGeneratedCode?: any
}) => {
  const pathname = usePathname()

  const { isMobile } = useWindowSize()
  const colors: any = tailwindConfig.theme?.extend?.colors

  useEffect(() => {
    if (pathname === "/code-idea" && typeof setGeneratedCode === "function") {
      setGeneratedCode("")
    }
  }, [setGeneratedCode, pathname])

  return !isMobile ? (
    <div
      id="sidebar"
      className={`absolute left-0 top-0 z-50 hidden h-full w-16 translate-x-full flex-col items-center border-r-[1px] border-purple-500 bg-purple-800
      transition-transform duration-700 sm:fixed ${
        pathname === "/" || pathname === "/pricing" ? "sm:hidden" : "sm:flex"
      } sm:translate-x-0`}
    >
      <div className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500">
        <Link href="/dashboard">
          <LayoutDashboard
            width={26}
            height={26}
            color={pathname === "/dashboard" ? colors.mint : "white"}
          />
        </Link>
      </div>

      <MaterialTooltip
        placement="right-start"
        className="ml-2 mt-2  border-[1px] border-gray-500 bg-purple-900  text-gray-200"
        content={translations?.suggestions}
      >
        <Link
          href="/code-idea?mode=smart"
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500"
        >
          <Code size={26} color={mode === "smart" ? colors.mint : "white"} />
        </Link>
      </MaterialTooltip>
      <MaterialTooltip
        placement="right-start"
        className="ml-2 mt-2  border-[1px] border-gray-500 bg-purple-900  text-gray-200"
        content={translations?.testing}
      >
        <Link
          href="/code-idea?mode=test"
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500"
        >
          <CurlyBraces
            size={25}
            color={mode === "test" ? colors.mint : "white"}
          />
        </Link>
      </MaterialTooltip>
      <MaterialTooltip
        placement="right-start"
        className="ml-2 mt-2  border-[1px] border-gray-500 bg-purple-900  text-gray-200"
        content={translations?.optimization}
      >
        <Link
          href="/code-idea?mode=improve"
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500"
        >
          <Rocket
            size={26}
            color={mode === "improve" ? colors.mint : "white"}
          />
        </Link>
      </MaterialTooltip>
      <MaterialTooltip
        placement="right-start"
        className="ml-2 mt-2  border-[1px] border-gray-500 bg-purple-900  text-gray-200"
        content={translations?.docs}
      >
        <Link
          href="/code-idea?mode=docs"
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500"
        >
          <FileCode size={26} color={mode === "docs" ? colors.mint : "white"} />
        </Link>
      </MaterialTooltip>
      <MaterialTooltip
        placement="right-start"
        className="ml-2 mt-2 border-[1px] border-gray-500 bg-purple-900  text-gray-200"
        content={translations?.chat}
      >
        <div className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500">
          <Link href="/code-chat">
            <MessageSquare
              size={26}
              color={pathname === "/code-chat" ? colors.mint : "white"}
            />
          </Link>
        </div>
      </MaterialTooltip>
      <MaterialTooltip
        placement="right-start"
        className="ml-2 mt-2 border-[1px] border-gray-500 bg-purple-900  text-gray-200"
        content={translations?.credits}
      >
        <div className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center rounded-md hover:bg-purple-500">
          <Link href="/pricing">
            <Users
              width={26}
              height={26}
              color={pathname === "/pricing" ? colors.mint : "white"}
            />
          </Link>
        </div>
      </MaterialTooltip>
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
