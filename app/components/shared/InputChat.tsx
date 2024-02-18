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

  React.useEffect(() => {
    // Check if the button element exists
    if (initialQuery !== "") {
      reload()
    }
  }, [])

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e)
      setNewLine(0)
    }
    if (e.key === "Enter" && e.shiftKey) {
      setNewLine((prev) => prev + 1)
    }
    if (e.key === "Backspace" && newLine > 0) {
      setNewLine((prev) => prev - 1)
    }
  }

  const hasAquestion = inputValue !== "" || initialQuery !== ""
  const totalRows = Math.min(
    Math.ceil(inputValue.trim().split(/\s+/).length / 14),
    6,
  )

  const height = !hasAquestion ? 56 : totalRows > 1 ? totalRows * 24 + 18 : 56
  console.log("newLine:", newLine)

  return (
    <div className="fixed bottom-4 left-0 right-0 z-20 mx-auto h-14 w-full bg-transparent">
      <div className="relative mx-auto mt-2 h-12 w-full sm:w-[900px]">
        <form
          id="chat-form"
          onSubmit={(e) => {
            handleSubmit(e)
            setNewLine(0)
          }}
        >
          <div
            style={{
              height: height + newLine * 24,
            }}
            className={cn(
              "absolute bottom-0 flex w-full flex-grow flex-col overflow-hidden rounded-2xl border [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)]",
            )}
          >
            <textarea
              id="chat-input"
              rows={totalRows}
              onKeyDown={handleUserKeyPress}
              style={{
                height: height + newLine * 24,
              }}
              className="h-14 w-full resize-none border-0 bg-transparent pl-3 pr-6 pt-3 text-white placeholder-white/50 focus:ring-0 focus-visible:ring-0  md:pl-4 md:pr-12"
              value={inputValue ?? initialQuery}
              onChange={handleInputChange}
              placeholder={translations?.ask}
            />
            <button
              type="submit"
              className={cn(
                "absolute bottom-3 mr-3 flex items-center justify-end rounded-lg bg-purple-800 p-1.5 hover:bg-purple-400 disabled:hover:bg-transparent sm:right-0",
                {
                  "bg-mint": hasAquestion,
                },
              )}
            >
              <ArrowRight
                className={cn("text-gray-400", {
                  "-rotate-[90deg]  font-bold text-purple-900": hasAquestion,
                })}
                width={20}
                height={20}
                onClick={(e) => {
                  handleSubmit(e)
                }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
