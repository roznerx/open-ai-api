import { Send } from "lucide-react"

export default function HomeChatInput({
  textareaRef,
  inputValue,
  handleInputChange,
  messages,
  translations,
}) {
  return (
    <>
      <input
        ref={textareaRef}
        className="font-lg placeholder:font-inter z-40 h-12 w-[95%] rounded-lg border-mint/40 bg-purple-400 
         py-2.5 pl-3 pr-12 text-white caret-mint/70 outline-0 ring-mint placeholder:pl-2 placeholder:pt-1 placeholder:text-[16px] placeholder:text-mint/60 placeholder:text-white focus:border-[1px] focus:border-mint/50 focus:outline-none  focus:outline-0 focus:ring-0 active:outline-0 sm:w-[900px]"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={messages.length === 1 ? translations?.placeholder : ""}
      />
      <button
        type="submit"
        title="Submit your prompt"
        aria-label="Submit your prompt"
        className="absolute right-4 top-[2px] h-11  rounded-lg border-mint bg-gray-900 p-1 disabled:hover:bg-transparent sm:right-1"
      >
        <Send
          className="mx-auto -mt-1 mr-2 flex rotate-45 pl-2 text-mint"
          width={30}
          height={30}
        />
      </button>
    </>
  )
}
