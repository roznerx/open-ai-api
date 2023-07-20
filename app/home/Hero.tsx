import { ArrowDown } from "lucide-react"

export default function Hero() {
  return (
    <div
      className={`mb-10 flex flex-col items-center justify-center pt-16 font-sans opacity-60 sm:pt-0`}
    >
      <div className=" flex h-12 w-12 animate-bounceArrow items-center justify-center">
        <ArrowDown size={35} color="white" />
      </div>
    </div>
  )
}
