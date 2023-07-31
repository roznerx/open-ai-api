import { Send } from "lucide-react"

export default function InputChat({
  translations,
  inputValue,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-20 mx-auto h-14 w-full bg-transparent">
      <div className="relative mx-auto mt-2 h-12 w-full sm:w-[900px]">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e)
            }
          }}
          className="font-lg mx-2 h-12 w-[90%] resize-none rounded-lg bg-purple-400 py-2.5 pl-3 pr-12  
               text-white outline-0 placeholder:pl-3 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px]
               placeholder:text-gray-300 hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 
               sm:w-[900px]"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={translations?.ask}
        />
        <button className="absolute right-8 top-2 rounded-lg bg-purple-700 hover:bg-purple-900 disabled:hover:bg-transparent sm:right-0">
          <Send
            className="mb-2 mr-2 rotate-45 pl-2 pt-1 text-mint"
            width={25}
            height={25}
            onClick={(e) => handleSubmit(e)}
          />
        </button>
      </div>
    </div>
  )
}
