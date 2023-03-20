import LoadingDots from "./LoadingDots"

type ButtonProps = {
  loading: boolean
  hidden?: boolean
  text?: string
  onClick: () => void
}
type StopButtonProps = {
  loading: boolean
  text?: string
  onCancel: () => void
}

export default function Button({
  loading,
  onClick,
  text = "",
  hidden = false,
}: ButtonProps) {
  return !loading ? (
    <button
      // bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500
      className={`${
        hidden ? "hidden" : null
      } mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 dark:bg-white  dark:text-slate-600 sm:mt-10`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  ) : (
    <button
      className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
      disabled
    >
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
      className="mt-8 w-full rounded-xl bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500 px-4 py-2 font-medium text-white hover:bg-black/80"
      onClick={onCancel}
    >
      {text}
    </button>
  ) : null
}
