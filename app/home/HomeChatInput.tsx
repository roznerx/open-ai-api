export default function HomeChatInput({
  messagesLength,
  textareaRef,
  inputValue,
  handleInputChange,
}) {
  return (
    <>
      <div className="relative mx-auto inline-flex h-16 w-[95%] items-center rounded-xl border border-gray-300 bg-purple-900 sm:w-[700px] ">
        <input
          ref={textareaRef}
          className="font-lg z-40 w-[590px] rounded-xl 
         border-none bg-purple-900 py-2.5 pl-3 pr-12 text-white caret-white outline-0 ring-mint placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px] placeholder:text-mint/60
        placeholder:text-white focus:border-[0px] focus:outline-none focus:outline-0 
         focus:ring-0 active:outline-0"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={messagesLength === 1 ? "What's your next code idea" : ""}
        />
        <button
          type="submit"
          title="Submit your prompt"
          aria-label="Submit your prompt"
          className="z-10 mr-2 h-12 w-48 rounded-xl border-mint bg-mint p-1 font-semibold text-purple-900 disabled:hover:bg-transparent "
        >
          Start with AI
        </button>
      </div>
    </>
  )
}
