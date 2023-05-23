import { Search } from "lucide-react"
import tailwindConfig from "tailwind.config.js"
import { useEffect, useRef } from "react"
import UserCodeSnippets from "./UserCodeSnippets"

const colors: any = tailwindConfig.theme?.extend?.colors

export default function SearchBar({
  sidebarOpen,
  userIsSearching,
  setSidebarOpen,
  searchTerm,
  setSearchTerm,
}) {
  const searchRef = useRef<any>(null)

  useEffect(() => {
    if (searchRef && searchRef.current && sidebarOpen) {
      searchRef.current.focus()
    }
  }, [sidebarOpen])

  return (
    <>
      <div
        className={`relative  mr-2 flex h-12 items-center rounded-md bg-transparent  sm:right-0 ${
          sidebarOpen ? "bg-purple-200" : "bg-transparent"
        }`}
      >
        <Search
          size={22}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          color={sidebarOpen ? colors.gray[600] : "white"}
          className={`my-1 cursor-pointer ${sidebarOpen && `mx-2`} `}
        />
        {sidebarOpen && (
          <input
            ref={searchRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type={"search"}
            placeholder="Search"
            className="duration-600 flex cursor-default rounded-md border-none bg-transparent text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 focus-visible:ring-offset-neutral-50 sm:bg-purple-200"
          />
        )}
      </div>
      <UserCodeSnippets
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sidebarOpen={sidebarOpen}
        userIsSearching={userIsSearching}
      />
    </>
  )
}
