import { useEffect, useRef } from "react"

const userSnippets = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
  "Item 9",
  "user",
  "react",
  "form",
]

export default function UserCodeSnippets({
  searchTerm,
  setSearchTerm,
  sidebarOpen,
  userIsSearching = false,
}) {
  let searchResults: any = []

  if (userIsSearching && searchTerm) {
    searchResults = userSnippets.filter((item) => {
      return item.indexOf(searchTerm) !== -1
    })
  }

  return (
    <div
      className={`mx-1 w-[95%] flex-col items-start justify-start text-white ${
        sidebarOpen ? "block" : "hidden"
      }`}
    >
      <ul
        className={`hidden h-72 cursor-pointer overflow-auto p-0 ${
          userIsSearching ? "hidden" : "block"
        }`}
      >
        {userSnippets.map((value, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setSearchTerm(value)}
              className="mt-1 rounded-sm bg-purple-500 p-1"
            >
              {value}
            </li>
          )
        })}
      </ul>
      <ul
        className={`h-72 cursor-pointer overflow-auto p-0 ${
          userIsSearching ? "block" : "hidden"
        }`}
      >
        {searchResults.map((value, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setSearchTerm(value)}
              className="mt-1 rounded-sm bg-purple-500 p-1"
            >
              {value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
