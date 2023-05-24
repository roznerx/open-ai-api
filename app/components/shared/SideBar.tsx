"use client"

import useWindowSize from "hooks/use-window-size"
import {
  MessageSquare,
  Code2,
  Home,
  LayoutDashboard,
  Rocket,
  CurlyBraces,
  Code,
  FileCode,
  Menu,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import tailwindConfig from "tailwind.config"

function SideBar({
  setSmartSelected,
  setImproveSelected,
  setDocSelected,
  setTestSelected,
  setOpenSecondaryNavBar,
  mode,
  setMode,
}: {
  setOpenSecondaryNavBar: any
  mode?: string
  setMode?: any
  setSmartSelected?: any
  setImproveSelected?: any
  setDocSelected?: any
  setTestSelected?: any
}) {
  const pathname = usePathname()

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // const [searchTerm, setSearchTerm] = useState("")
  // const userIsSearching = searchTerm !== ""

  const { isMobile } = useWindowSize()
  const colors: any = tailwindConfig.theme?.extend?.colors
  // const selectedMode = () => {
  //   switch (mode) {
  //     case "smart":
  //       return "Smart"
  //     case "improve":
  //       return "Improve"
  //     case "test":
  //       return "Test"
  //     case "docs":
  //       return "Documentation"
  //     default:
  //       return "Smart"
  //   }
  // }
  const CodeIdeaMode = ({ size }) => {
    if (mode === "smart") {
      return (
        <Code
          size={size}
          color={pathname === "/code-idea" ? colors.mint : "white"}
        />
      )
    } else if (mode === "test") {
      return (
        <CurlyBraces
          size={size}
          color={pathname === "/code-idea" ? colors.mint : "white"}
        />
      )
    } else if (mode === "improve") {
      return (
        <Rocket
          size={size}
          color={pathname === "/code-idea" ? colors.mint : "white"}
        />
      )
    } else if (mode === "docs") {
      return (
        <FileCode
          size={size}
          color={pathname === "/code-idea" ? colors.mint : "white"}
        />
      )
    }
    return (
      <Code2
        size={size}
        color={pathname === "/code-idea" ? colors.mint : "white"}
        className={`ml-1.5 text-white`}
      />
    )
  }

  return !isMobile ? (
    <div
      id="sidebar"
      className={`absolute top-0 left-0 z-50 hidden h-full w-16 translate-x-full flex-col items-center border-r-[1px] border-purple-500 bg-purple-800
      transition-transform duration-700 sm:fixed sm:flex sm:translate-x-0`}
    >
      <div className="mt-3 flex h-12 w-full items-center justify-center rounded-md hover:bg-purple-500">
        <Link href="/dashboard" className="cursor-pointer">
          <LayoutDashboard
            width={26}
            height={26}
            color={pathname === "/dashboard" ? colors.mint : "white"}
          />
        </Link>
      </div>

      <div
        onClick={() => {
          if (typeof setOpenSecondaryNavBar !== "undefined") {
            setOpenSecondaryNavBar((prevState) => !prevState)
          }
        }}
        className="mt-4 flex h-12 w-full items-center justify-center rounded-md hover:bg-purple-500"
      >
        <Link href="/code-idea" className="cursor-pointer">
          <CodeIdeaMode size={26} />
        </Link>
      </div>

      <div className="mt-4 flex h-12 w-full items-center justify-center rounded-md hover:bg-purple-500">
        <Link href="/code-chat" className="cursor-pointer">
          <MessageSquare
            size={26}
            color={pathname === "/code-chat" ? colors.mint : "white"}
          />
        </Link>
      </div>
      {/* <div className="mt-8 cursor-pointer">
        <SearchBar
          userIsSearching={userIsSearching}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div> */}
    </div>
  ) : (
    <div
      className={`absolute top-0 left-0 z-50 h-full rounded-r-lg  font-sans   ${
        showMobileMenu ? "w-80 bg-purple-700" : "w-16 bg-none"
      } flex-row items-start `}
    >
      <div
        onClick={() => {
          setShowMobileMenu((prevState) => !prevState)
        }}
        className="cursor-pointer"
      >
        <div className="p-3">
          {!showMobileMenu ? (
            <Menu color="white" className="mt-4 ml-3" />
          ) : (
            <div className="flex justify-between">
              <ArrowLeft className="mt-5 ml-4" color="white" />
              <div className="mx-auto mt-3 flex">
                <Image
                  src={"/logo/code-genius.svg"}
                  width={32}
                  height={32}
                  loading="eager"
                  className={"right-8"}
                  alt="Code Genius"
                />
                <h1
                  className={`text-lg sm:text-xl sm:text-xl mt-1 ml-2
                    bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text font-sans text-2xl font-bold tracking-tight text-transparent  sm:leading-6`}
                >
                  Code Genius
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col items-start justify-start ${
          showMobileMenu ? "block" : "hidden"
        }`}
      >
        <Link
          href="/"
          className={`mt-8 w-[100%] ${
            pathname === "/" ? "bg-purple-500" : "bg-none"
          } cursor-pointer`}
        >
          <div className="ml-4 inline-flex h-[50px] w-auto items-start justify-start rounded-md pr-2">
            <Home
              width={26}
              height={26}
              color={pathname === "/" ? colors.mint : "white"}
              className="ml-1.5"
            />
            <p className="text-sm ml-4 pt-1 text-white">Home</p>
          </div>
        </Link>
        <Link
          href="/dashboard"
          className={`w-[100%] ${
            pathname === "/dashboard" ? "bg-purple-500" : "bg-none"
          } cursor-pointer`}
        >
          <div className="ml-4 mt-5 inline-flex h-[50px] w-auto items-start justify-start rounded-md pr-2">
            <LayoutDashboard
              width={26}
              height={26}
              color={pathname === "/dashboard" ? colors.mint : "white"}
              className="ml-1.5"
            />
            <p className="text-sm ml-4 pt-1 text-white">Dashboard</p>
          </div>
        </Link>
        <Link
          href="/code-chat"
          className={`w-full cursor-pointer  ${
            pathname === "/code-chat" ? "bg-purple-500" : "bg-none"
          }`}
        >
          <div className="ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2">
            <MessageSquare
              width={26}
              height={26}
              color={pathname === "/code-chat" ? colors.mint : "white"}
              className="ml-1.5 text-white"
            />
            <p className="text-sm ml-4 pb-1 text-white">Code Chat</p>
          </div>
        </Link>

        <Link
          href={`/code-idea`}
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" ? "bg-purple-500" : "bg-none"
          } `}
        >
          <div className="mt-5 ml-4 inline-flex h-[50px] items-start justify-start rounded-md pr-2">
            <div className="ml-1">
              <CodeIdeaMode size={26} />
            </div>
            {/* <p className="text-sm ml-4 pt-0 text-white">{selectedMode()}</p> */}
            <div
              className={`ml-2 flex gap-4 ${
                pathname === "/code-idea" ? "block" : "hidden"
              }`}
            >
              <Code2
                size={26}
                onClick={() => {
                  setMode("smart")
                  setSmartSelected(true)
                  setImproveSelected(false)
                  setTestSelected(false)
                  setDocSelected(false)
                  setShowMobileMenu((prevState) => !prevState)
                }}
                color={"white"}
                className={`ml-1.5 cursor-pointer border-purple-300 ${
                  mode === "smart" ? "hidden" : "block"
                }`}
              />
              <Rocket
                onClick={() => {
                  setMode("improve")
                  setImproveSelected(true)
                  setSmartSelected(false)
                  setTestSelected(false)
                  setDocSelected(false)
                  setShowMobileMenu((prevState) => !prevState)
                }}
                color={"white"}
                size={26}
                className={` ${
                  mode === "improve" ? "hidden" : "block"
                } cursor-pointer`}
              />
              <CurlyBraces
                onClick={() => {
                  setMode("test")
                  setTestSelected(true)
                  setImproveSelected(false)
                  setSmartSelected(false)
                  setDocSelected(false)
                  setShowMobileMenu((prevState) => !prevState)
                }}
                size={26}
                color={"white"}
                className={`cursor-pointer ${
                  mode === "test" ? "hidden" : "block"
                }`}
              />
              <FileCode
                onClick={() => {
                  setMode("docs")
                  setDocSelected(true)
                  setImproveSelected(false)
                  setSmartSelected(false)
                  setTestSelected(false)
                  setShowMobileMenu((prevState) => !prevState)
                }}
                size={26}
                color={"white"}
                className={`cursor-pointer ${
                  mode === "docs" ? "hidden" : "block"
                }`}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default React.memo(SideBar)
