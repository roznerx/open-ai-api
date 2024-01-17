import useWindowSize from "hooks/use-window-size"
import dynamic from "next/dynamic"
import { useRef, useState } from "react"

const TypeAnimation = dynamic(() =>
  import("react-type-animation").then((mod) => mod.TypeAnimation),
)

export default function HomeChatInput({
  inputRef,
  inputValue,
  handleInputChange,
  translations,
}) {
  const { isMobile } = useWindowSize()
  const [isFocus, setIsFocus] = useState(false)
  const rotatingTextRef = useRef<HTMLDivElement | null>(null)

  const handleFocus = () => {
    if (rotatingTextRef.current && inputRef.current) {
      rotatingTextRef.current.classList.add("hidden")
      inputRef.current.focus()
    }
  }
  console.log("isFocus", isFocus)

  return (
    <div className="relative">
      <div
        onFocus={handleFocus}
        onClick={() => setIsFocus(true)}
        className="relative mx-auto inline-flex h-16 w-[95%] items-center rounded-xl border border-gray-300 bg-purple-900 sm:w-[700px] "
      >
        <input
          id="chat-message"
          ref={inputRef}
          className="font-lg z-10 w-[388px]  rounded-xl border-none 
         bg-purple-900 py-2.5 pl-3 pr-12 text-white caret-white outline-0 
         ring-mint placeholder:pl-2 placeholder:pt-1 placeholder:font-sans placeholder:text-[16px]
          placeholder:text-mint/60 placeholder:text-white
        focus:border-[0px] focus:outline-none focus:outline-0 focus:ring-0 
         active:outline-0 sm:w-[590px]"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button
          type="submit"
          title="Submit your prompt"
          aria-label={translations.cta}
          className="group mr-2 h-12 rounded-xl border-slate-200 bg-violet-500/90 px-2 text-white  sm:w-48 sm:p-1"
        >
          <p className="text-[15px] tracking-wide group-hover:scale-95  sm:text-[18px] sm:font-semibold">
            {isMobile ? translations.ctaMobile : translations.cta}
          </p>
        </button>
      </div>
      <div
        className={`${
          isFocus ? "hidden" : "block"
        } absolute bottom-3 left-5 z-20  w-[258px] text-left leading-6 sm:bottom-5 sm:left-28 sm:w-auto`}
      >
        <TypeAnimation
          preRenderFirstString={true}
          ref={rotatingTextRef}
          className="rotating-text text-slate-200"
          sequence={[
            translations.message1,
            1000,
            translations.message2,
            1000,
            translations.message3,
            1000,
            translations.message4,
            1000,
            translations.message5,
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
