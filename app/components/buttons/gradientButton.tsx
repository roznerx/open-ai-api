//Fill in the props type and add it to GradientButton
type GradientButtonPros = {
  width?: string
  height?: string
  from?: string
  to?: string
  text?: string
  onClick?: () => void
}

export default function GradientButton({
  text = "",
  onClick,
}: GradientButtonPros) {
  return (
    <div
      onClick={onClick}
      className={`mx-auto my-4 mt-10 flex w-auto min-w-[160px] cursor-pointer rounded-lg  
      font-sans sm:flex-row sm:items-start sm:justify-center`}
    >
      <div
        className={`relative w-full items-center justify-center rounded-lg bg-mint hover:bg-mint/60`}
      >
        <div className="text-base px-4 py-2 text-center font-semibold text-purple-900 hover:font-semibold sm:mx-auto sm:px-4">
          {text}
        </div>
      </div>
    </div>
  )
}
