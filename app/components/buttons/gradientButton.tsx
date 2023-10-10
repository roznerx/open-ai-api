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
      className={`mx-auto my-4 mt-10 flex w-[120%] cursor-pointer rounded-lg border border-mint 
                 font-sans sm:w-[100%] sm:flex-row
                sm:items-start sm:justify-center`}
    >
      <div
        className={`relative w-full items-center justify-center rounded-lg bg-purple-700 hover:bg-mint`}
      >
        <div className="text-sm px-1 py-2 text-center text-white hover:font-semibold hover:text-purple-900 sm:mx-auto sm:px-2">
          {text}
        </div>
      </div>
    </div>
  )
}
