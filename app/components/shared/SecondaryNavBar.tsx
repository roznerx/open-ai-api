"use client"

import { Code, Rocket, FileCode, CurlyBraces } from "lucide-react"
import { useState } from "react"
import tailwindConfig from "tailwind.config"

const colors: any = tailwindConfig.theme?.extend?.colors

export default function SecondaryNavBar({
  isCodeModeSelected,
  setOpenSecondayNavBar,
  openSecondayNavBar,
  improveSelected,
  setImproveSelected,
  smartSelected,
  setSmartSelected,
  docSelected,
  setDocSelected,
  testSelected,
  setTestSelected,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(openSecondayNavBar)
  //   const [searchTerm, setSearchTerm] = useState("")
  //   const userIsSearching = searchTerm !== ""

  return (
    <div
      id="secondary-sidebar"
      className={`${isCodeModeSelected ? "hidden" : "block"}
      ${sidebarOpen ? "block" : "hidden"}
      absolute top-0 left-[64px] z-20 h-auto min-h-screen flex-col
      items-start bg-purple-800 pl-0 transition-transform duration-700
        sm:flex sm:translate-x-0`}
    >
      {/* <SearchBar
        userIsSearching={userIsSearching}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      /> */}

      <div
        className="mt-3 inline-flex"
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!smartSelected) {
            setSmartSelected(!smartSelected)
          }
          setTestSelected(false)
          setDocSelected(false)
          setImproveSelected(false)
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <Code
            size={26}
            color={smartSelected ? colors.mint : "white"}
            className="cursor-pointer border-purple-300"
          />
          <p
            className={`ml-4 w-[200px] ${sidebarOpen ? "block" : "hidden"} ${
              smartSelected ? "text-mint" : "text-white"
            } `}
          >
            Code Suggestions
          </p>
        </div>
      </div>
      <div
        className="mt-0 inline-flex "
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!improveSelected) {
            setImproveSelected(!improveSelected)
          }
          setSmartSelected(false)
          setTestSelected(false)
          setDocSelected(false)
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <Rocket
            color={improveSelected ? colors.mint : "white"}
            size={26}
            className="cursor-pointer border-purple-300 "
          />
          <p
            className={`ml-4 w-[200px] ${sidebarOpen ? "block" : "hidden"}  ${
              improveSelected ? "text-mint" : "text-white"
            }`}
          >
            Improve Code
          </p>
        </div>
      </div>
      <div
        className="mt-0 inline-flex"
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!testSelected) {
            setTestSelected(!testSelected)
          }
          setSmartSelected(false)
          setDocSelected(false)
          setImproveSelected(false)
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <CurlyBraces size={26} color={testSelected ? colors.mint : "white"} />
          <p
            className={`ml-4 w-[200px] ${sidebarOpen ? "block" : "hidden"} ${
              testSelected ? "text-mint" : "text-white"
            } `}
          >
            Test Generation
          </p>
        </div>
      </div>
      <div
        className="mt-0 inline-flex "
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!docSelected) {
            setDocSelected(!docSelected)
          }
          setSmartSelected(false)
          setTestSelected(false)
          setImproveSelected(false)
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <FileCode size={26} color={docSelected ? colors.mint : "white"} />
          <p
            className={`ml-4 w-[200px] ${
              docSelected ? "text-mint" : "text-white"
            } ${sidebarOpen ? "block" : "hidden"} `}
          >
            Docs Generation
          </p>
        </div>
      </div>
    </div>
  )
}
