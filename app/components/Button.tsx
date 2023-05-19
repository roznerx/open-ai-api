import LoadingDots from "./LoadingDots"

type ButtonProps = {
  loading: boolean
  hidden?: boolean
  text?: string
  buttonTextColor?: string
  variant?: string
  onClick: () => void
}
type StopButtonProps = {
  loading: boolean
  text?: string
  onClick: () => void
}

export default function Button({
  loading,
  variant,
  buttonTextColor,
  onClick,
  text = "",
  hidden = false,
}: ButtonProps) {
  return !loading ? (
    <button
      className={`${
        hidden ? "hidden" : null
      }  "bg-mint" h-12 w-40 rounded-full bg-black px-4 py-2 font-sans font-medium ${
        variant === "mint" ? "bg-mint" : "bg-transparent"
      } hover:bg-mint/80   dark:text-slate-600 ${
        buttonTextColor === "dark" || typeof buttonTextColor === "undefined"
          ? "text-gray-600"
          : "text-white"
      } font-semibold`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  ) : (
    <button
      className="flex w-[148px] items-center justify-start rounded-md bg-purple-800  px-4 py-2 align-middle font-medium text-white hover:bg-purple-800/80"
      disabled
    >
      <span className="mr-2 text-white">Loading</span>
      <LoadingDots color="white" style="large" />
    </button>
  )
}

export function StopButton({
  loading,
  onClick,
  text = "Generate Code",
}: StopButtonProps) {
  return loading ? (
    <button
      // bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500
      className=" w-full rounded-xl bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500 px-4 py-2 font-medium text-white hover:bg-black/80"
      onClick={onClick}
    >
      {text}
    </button>
  ) : null
}
