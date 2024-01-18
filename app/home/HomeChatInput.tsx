import useWindowSize from "hooks/use-window-size"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

const TypeAnimation = dynamic(() =>
  import("react-type-animation").then((mod) => mod.TypeAnimation),
)

export default function HomeChatInput({
  labelText,
  inputValue,
  handleInputChange,
  translations,
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { isMobile } = useWindowSize()
  const [isFocus, setIsFocus] = useState(false)
  const rotatingTextRef = useRef<HTMLDivElement | null>(null)

  const handleFocus = () => {
    if (rotatingTextRef.current && inputRef.current) {
      rotatingTextRef.current.classList.add("hidden")
      inputRef.current.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue !== "") {
      router.push(`/code-chat?q=${inputValue}`)
    } else if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-col">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative w-full text-center sm:w-[900px]"
        >
          <div className="mt-5 flex items-center justify-center">
            <label
              className="text-lg z-40 mx-auto w-full px-10 pb-6 text-2xl text-slate-100 
          sm:px-3 sm:text-2xl"
              htmlFor="home-input"
            >
              {labelText}
            </label>
          </div>
          <div
            onFocus={handleFocus}
            onClick={() => setIsFocus(true)}
            className="relative mt-8 inline-flex h-14 w-[95%] items-center rounded-xl border border-gray-300 bg-purple-900  sm:mx-auto sm:h-16 sm:w-[700px]"
          >
            <input
              id="home-input"
              ref={inputRef}
              className="font-lg z-10 w-full rounded-xl border-none 
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
              className="group mr-1 h-11 w-auto rounded-xl border-slate-200 bg-violet-500/90 px-3  text-white sm:mr-2 sm:h-12 sm:w-48 sm:p-1"
            >
              <p className="text-[15px] tracking-wider group-hover:scale-95 sm:text-[18px] sm:font-semibold sm:tracking-wide">
                {isMobile ? translations.ctaMobile : translations.cta}
              </p>
            </button>
          </div>
          <div
            className={`${
              isFocus ? "hidden" : "block"
            } absolute bottom-2 left-5 z-20  w-[258px] text-left leading-6 sm:bottom-5 sm:left-28 sm:w-auto`}
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
        </form>
      </div>
    </div>
  )
}
