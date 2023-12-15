import { useRef } from "react"
import { TypeAnimation } from "react-type-animation"

export default function HomeChatInput({ inputValue, handleInputChange }) {
  const rotatingTextRef = useRef<HTMLDivElement | null>(null)

  const handleFocus = () => {
    if (rotatingTextRef.current) {
      rotatingTextRef.current.classList.add("hidden")
    }
  }
  return (
    <div className="relative">
      <div
        onFocus={handleFocus}
        className="relative mx-auto inline-flex h-16 w-[95%] items-center rounded-xl border border-gray-300 bg-purple-900 sm:w-[700px] "
      >
        <input
          className="font-lg z-40 w-[590px] rounded-xl 
         border-none bg-purple-900 py-2.5 pl-3 pr-12 text-white caret-white outline-0 ring-mint placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px] placeholder:text-mint/60
        placeholder:text-white focus:border-[0px] focus:outline-none focus:outline-0 
         focus:ring-0 active:outline-0"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          title="Submit your prompt"
          aria-label="Submit your prompt"
          className="z-10 mr-2 h-12 w-48 rounded-xl border-violet-500 bg-violet-500 p-1 font-semibold text-white disabled:hover:bg-transparent "
        >
          Start with AI
        </button>
      </div>
      <div className="absolute bottom-5 left-7 z-50 sm:left-28">
        <TypeAnimation
          ref={rotatingTextRef}
          className="rotating-text text-white"
          sequence={[
            "Write a chat application",
            1000,
            `Help me understanding Typescript`,
            1000,
            "Teach me React Native",
            1000,
            "Teach me AWS",
            1000,
            "Teach me Python",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  )
}
