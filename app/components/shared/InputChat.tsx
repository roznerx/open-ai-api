import { Send } from "lucide-react"

export default function InputChat({
  inputRef,
  codeSentence,
  setCodeSentence,
  onCodeGeneration,
  onArrowPress,
}) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-20 mx-auto h-14 w-full bg-transparent">
      <div className="relative mx-auto mt-2 h-12 w-full sm:w-[900px]">
        <input
          ref={inputRef}
          className="font-lg mx-2 h-12 w-[90%] resize-none rounded-lg bg-purple-400 py-2.5 pr-12 pl-3  
              font-mono text-white outline-0 placeholder:pt-1 placeholder:pl-3 placeholder:font-sans placeholder:text-[16px]
               placeholder:text-gray-300 hover:outline-0 focus:border-transparent focus:ring-black/30 active:outline-0 
               sm:w-[900px]"
          value={codeSentence}
          onChange={(e) => setCodeSentence(e.target.value)}
          onKeyDown={(e) => onCodeGeneration(e)}
          placeholder={"Ask to Code Genius.."}
        />
        <button className="absolute right-8 top-2 rounded-lg bg-purple-700 hover:bg-purple-900 disabled:hover:bg-transparent sm:right-0">
          {/* <Image
            className="mb-1 mr-2 py-2 pb-1 pl-2 text-white"
            alt="Send"
            width={30}
            height={30}
            src="/home/send.svg"
            onClick={() => onArrowPress()}
          /> */}
          <Send
            className="mb-2 mr-2 rotate-45 pt-1  pl-2 text-mint"
            width={25}
            height={25}
            onClick={() => onArrowPress()}
          />
        </button>
      </div>
    </div>
  )
}
