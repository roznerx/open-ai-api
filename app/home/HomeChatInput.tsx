import useWindowSize from "hooks/use-window-size"
import { useRef } from "react"
import { TypeAnimation } from "react-type-animation"

export default function HomeChatInput({
  inputValue,
  handleInputChange,
  translations,
}) {
  const { isMobile } = useWindowSize()
  const rotatingTextRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFocus = () => {
    if (rotatingTextRef.current && inputRef.current) {
      rotatingTextRef.current.classList.add("hidden")
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative">
      <div
        onFocus={handleFocus}
        className="relative mx-auto inline-flex h-16 w-[95%] items-center rounded-xl border border-gray-300 bg-purple-900 sm:w-[700px] "
      >
        <input
          ref={inputRef}
          className="font-lg z-10 w-[590px] rounded-xl 
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
          className="group mr-2 h-12 w-48 rounded-xl border-violet-500 bg-violet-500 p-1 text-white disabled:hover:bg-transparent"
        >
          <p className="text-[18px] font-semibold group-hover:scale-95 group-hover:text-gray-100">
            {isMobile ? translations.ctaMobile : translations.cta}
          </p>
        </button>
      </div>
      <div className="absolute bottom-5 left-7 z-20 sm:left-28">
        <TypeAnimation
          ref={rotatingTextRef}
          className="rotating-text text-gray-200"
          sequence={[
            "Write a chat application",
            1000,
            `Teach me Typescript`,
            1000,
            "Teach me React Native",
            1000,
            "Teach me AWS",
            1000,
            "Teach me Python",
            1000,
          ]}
          wrapper="span"
          speed={55}
          repeat={Infinity}
        />
      </div>
    </div>
  )
}
