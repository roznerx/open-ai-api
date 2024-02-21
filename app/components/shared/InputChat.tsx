import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import React, { useState } from "react"

export default function InputChat({
  reload,
  initialQuery,
  translations,
  inputValue,
  handleInputChange,
  handleSubmit,
}) {
  const [newLine, setNewLine] = useState(0)
  const [count, setCount] = React.useState(0)
  console.log("count:", count)

  React.useEffect(() => {
    // Check if the button element exists
    if (initialQuery !== "") {
      reload()
    }
  }, [])

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && count < 500) {
      handleSubmit(e)
      setNewLine(0)
      setCount(500)
    }
    if (e.key === "Enter" && e.shiftKey) {
      setNewLine((prev) => prev + 1)
    }
    if (e.key === "Backspace" && newLine > 0) {
      setNewLine((prev) => prev - 1)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length)
  }

  const hasAquestion = inputValue !== "" || initialQuery !== ""
  const totalRows = Math.min(
    Math.floor(inputValue.trim().split(/\s+/).length / 14),
    6,
  )

  const height = !hasAquestion ? 56 : totalRows > 1 ? totalRows * 24 + 14 : 56

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto h-14 w-[95%] bg-transparent  sm:mx-auto sm:w-full">
      <div className="relative mx-auto mt-2 h-12 w-full sm:w-[900px]">
        <form
          id="chat-form"
          onSubmit={(e) => {
            if (count < 500) {
              handleSubmit(e)
              setNewLine(0)
              setCount(0)
            }
          }}
        >
          <div
            style={{
              height: height + newLine * 14,
            }}
            className={cn(
              "absolute bottom-0 flex w-full flex-grow flex-col overflow-hidden rounded-2xl border border-gray-300 bg-purple-900 [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)]",
            )}
          >
            <textarea
              id="chat-input"
              rows={totalRows}
              onKeyUp={handleKeyUp}
              onKeyDown={handleUserKeyPress}
              style={{
                height: height + newLine * 14,
              }}
              className={cn(
                "h-14 w-full resize-none border-0 bg-transparent pl-3 pr-6 pt-3 text-white placeholder-white/50 focus:ring-0 focus-visible:ring-0 md:pl-4 md:pr-12",
              )}
              value={inputValue ?? initialQuery}
              onChange={handleInputChange}
              placeholder={translations?.ask}
            />
            <button
              type="submit"
              className={cn(
                "absolute bottom-3 right-2 mr-2 flex items-center justify-end rounded-lg bg-purple-500 p-1.5 disabled:hover:bg-transparent sm:right-0",
                {
                  "bg-mint/95 hover:bg-mint/80": hasAquestion,
                },
              )}
            >
              <ArrowRight
                className={cn("-rotate-[90deg] text-gray-300", {
                  " font-bold  text-purple-900 ": hasAquestion,
                })}
                width={20}
                height={20}
                onClick={(e) => {
                  e.preventDefault()
                  if (count < 500) {
                    handleSubmit(e)
                    setNewLine(0)
                    setCount(0)
                  } else {
                    console.log("too much chars")
                  }
                }}
              />
            </button>
          </div>
        </form>
        <div className="text-gray-300">Chars remaining {500 - count}</div>
      </div>
    </div>
  )
}
