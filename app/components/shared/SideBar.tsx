import { HomeIcon, Code } from "lucide-react"
import Image from "next/image"
import SearchBar from "./SearchBar"

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      id="sidebar"
      className={`absolute top-0 left-0 hidden h-full -translate-x-full flex-col items-start border-r border-purple-400 transition-transform duration-700 sm:relative sm:flex sm:translate-x-0 ${
        sidebarOpen ? "w-68" : "w-[65px]"
      } bg-purple-700 px-5 pt-3`}
    >
      {/* <HomeIcon
        size={26}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        color="white"
        className="cursor-pointer border-purple-300 text-purple-400"
      /> */}
      <Image
        alt="React JS"
        src={"/logo.svg"}
        width={24}
        height={24}
        className="mb-8"
      />
      <SearchBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Code
        size={26}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        color="white"
        className="my-6 cursor-pointer border-purple-300 text-purple-400"
      />
    </div>
  )
}
