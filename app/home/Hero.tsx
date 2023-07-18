"use client"

import { ArrowDown } from "lucide-react"

export default function Hero() {
  return (
    <div
      className={`mb-10 flex flex-col items-center justify-center pt-16 font-sans opacity-60 sm:pt-0`}
    >
      <div className="duration-2000 flex h-12 w-12 items-center justify-center">
        <ArrowDown size={40} color="white" />
      </div>
      <p className="text-md text-white">Scroll</p>
    </div>
  )
}
