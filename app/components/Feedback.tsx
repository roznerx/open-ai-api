import { Heart, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Feedback({ showWidget, setShowWidget, session }) {
  const [userMessage, setUserMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [likeHeart, setLikeHeart] = useState(false)
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)

  const onMessageSubmit = async () => {
    setIsLoading(true)

    const payload = {
      name: session?.user?.name,
      message: userMessage,
    }
    await fetch(`/api/email/sendFeedback`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    setIsLoading(false)
    setUserMessage("Thanks for your feedback!")
  }

  const inputRef = useRef<any>(null)
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])
  return (
    <>
      <div
        className={` z-50 mt-2 ${
          showWidget ? "block" : "hidden"
        }  max-w-md rounded-full px-1 pb-3 font-sans sm:mx-auto`}
      >
        <div className="relative flex h-72 flex-col rounded-xl border border-gray-500 bg-purple-500 shadow-lg">
          <span
            onClick={() => setShowWidget(false)}
            className="absolute right-4 top-4 cursor-pointer text-white"
          >
            {/* <X size={20} className="text-gray-300" /> */}
          </span>
          <div className="border-b border-gray-500 py-3">
            <span className="sm:text-lg mx-auto flex flex-wrap items-center justify-center text-center font-sans text-gray-200">
              Your feedback matter to us
              <Heart
                onClick={() => setLikeHeart(true)}
                className="ml-2 cursor-pointer"
                fill={likeHeart ? "white" : "transparent"}
                size={20}
              />
            </span>
          </div>
          <div className="flex w-full flex-col items-center bg-purple-500 ">
            <div className="flex flex-col items-center py-6">
              <div className="flex w-full flex-col px-3">
                <textarea
                  ref={inputRef}
                  rows={4}
                  cols={32}
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full resize-none rounded-xl border border-gray-500 bg-purple-900 p-4 text-white outline-none placeholder:text-gray-300 focus:border-gray-500 focus:outline-none focus:ring-0 "
                  placeholder={`Please, add your feedback here`}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="absolute right-4 bottom-3">
            <button
              onClick={() => onMessageSubmit()}
              className="flex h-6 w-28 items-center justify-center rounded-lg border border-gray-500 bg-purple-900 p-5 text-gray-300 hover:cursor-pointer hover:text-gray-100"
            >
              <span>
                {isLoading ? <Loader2 className="animate-spin" /> : "Send"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

{
  /* <form>
  <label htmlfor="feedback">How can we improve?</label>
  <div className="flex flex-col space-y-2">
    <textarea
      id="feedback"
      className="h-24 w-64 rounded-md border border-gray-400 p-2"
    ></textarea>
    <button
      className="bg-blue-700 hover:bg-blue-600 ml-auto rounded-lg p-2 text-white shadow-md hover:shadow-lg"
      type="submit"
    >
      Send Feedback
    </button>
  </div>
</form> */
}
