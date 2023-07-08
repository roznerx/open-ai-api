import {
  MessageSquare,
  Code2,
  Home,
  LayoutDashboard,
  Rocket,
  CurlyBraces,
  FileCode,
  Menu,
  ArrowLeft,
} from "lucide-react"

import Link from "next/link"
import { useState } from "react"

export default function MobileSideBar({ router, pathname, colors, mode }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div
      className={`absolute top-0 left-0 z-50 h-full rounded-r-lg  font-sans   ${
        showMobileMenu
          ? "w-80 border-r border-gray-600 bg-purple-700 "
          : "w-16 bg-none"
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
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "smart"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <div
            onClick={() => {
              router.push("/code-idea?mode=smart")
              setShowMobileMenu((prevState) => !prevState)
            }}
            className=" ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2"
          >
            <Code2
              size={26}
              color={mode === "smart" ? colors.mint : "white"}
              className={`ml-1.5 cursor-pointer border-purple-300`}
            />
            <p className="text-sm ml-4 pb-1 text-white">Suggestions mode</p>
          </div>
        </div>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "improve"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <div
            onClick={() => {
              router.push("/code-idea?mode=improve")
              setShowMobileMenu((prevState) => !prevState)
            }}
            className="ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2"
          >
            <Rocket
              color={mode === "improve" ? colors.mint : "white"}
              size={26}
              className={`cursor-pointer`}
            />
            <p className="text-sm ml-4 pb-1 text-white">Improvements mode</p>
          </div>
        </div>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "test"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <div
            onClick={() => {
              router.push("/code-idea?mode=test")
              setShowMobileMenu((prevState) => !prevState)
            }}
            className="ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2"
          >
            <CurlyBraces
              size={26}
              color={mode === "test" ? colors.mint : "white"}
              className={`cursor-pointer`}
            />
            <p className="text-sm ml-4 pb-1 text-white">Testing mode</p>
          </div>
        </div>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "docs"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <div
            onClick={() => {
              router.push("/code-idea?mode=docs")
              setShowMobileMenu((prevState) => !prevState)
            }}
            className={`ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2`}
          >
            <FileCode
              size={26}
              color={mode === "docs" ? colors.mint : "white"}
            />
            <p className="text-sm ml-4 pb-1 text-white">Docs mode</p>
          </div>
        </div>
      </div>
    </div>
  )
}
