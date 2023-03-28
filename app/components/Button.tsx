import LoadingDots from "./LoadingDots"

type ButtonProps = {
  loading: boolean
  hidden?: boolean
  text?: string
  variant?: string
  onClick: () => void
}
type StopButtonProps = {
  loading: boolean
  text?: string
  onCancel: () => void
}

export default function Button({
  loading,
  variant,
  onClick,
  text = "",
  hidden = false,
}: ButtonProps) {
  return !loading ? (
    <button
      // bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500
      className={`${hidden ? "hidden" : null} ${
        variant === "mint" ? "bg-mint" : "bg-black"
      }  w-36 rounded-md bg-black px-4 py-2 font-medium ${
        variant === "mint" ? "text-black" : "text-mint"
      } hover:bg-mint/80  dark:bg-white  dark:text-slate-600 `}
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
  onCancel,
  text = "Generate Code",
}: StopButtonProps) {
  return loading ? (
    <button
      // bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500
      className=" w-full rounded-xl bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500 px-4 py-2 font-medium text-white hover:bg-black/80"
      onClick={onCancel}
    >
      {text}
    </button>
  ) : null
}
