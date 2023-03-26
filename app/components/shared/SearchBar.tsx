import { Search } from "lucide-react"
import { useEffect, useRef } from "react"

export default function SearchBar({ sidebarOpen, setSidebarOpen }) {
  const searchRef = useRef<any>(null)
  useEffect(() => {
    if (searchRef && searchRef.current && sidebarOpen) {
      searchRef.current.focus()
    }
  }, [sidebarOpen])

  return (
    <div
      className={`relative  mr-2 flex h-12 items-center rounded-md bg-transparent  sm:right-0 ${
        sidebarOpen ? "bg-purple-200" : "bg-transparent"
      }`}
    >
      <Search
        size={22}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        color={sidebarOpen ? "#2F2E49" : "white"}
        className={`my-1 cursor-pointer ${sidebarOpen && `mx-2`}`}
      />
      {sidebarOpen && (
        <input
          ref={searchRef}
          type={"search"}
          placeholder="Search"
          className="duration-600 flex cursor-default rounded-md border-none bg-transparent text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 focus-visible:ring-offset-neutral-50 sm:bg-purple-200"
        />
      )}
    </div>
  )
}
