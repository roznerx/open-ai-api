import { HomeIcon, CodeIcon } from "lucide-react"
import SearchBar from "./SearchBar"

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      id="sidebar"
      className={`fixed top-0 left-0 z-40 mt-12 hidden h-screen -translate-x-full flex-col items-start border-r border-purple-400 transition-transform duration-700 sm:relative sm:flex sm:translate-x-0 ${
        sidebarOpen ? "w-68" : "w-[65px]"
      } bg-purple-700 px-5 pt-3`}
    >
      {/* <HomeIcon
        size={26}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        color="white"
        className="cursor-pointer border-purple-300 text-purple-400"
      /> */}
      <SearchBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <CodeIcon
        size={26}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        color="white"
        className="my-6 cursor-pointer border-purple-300 text-purple-400"
      />
    </div>
  )
}
