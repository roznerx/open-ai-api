import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className="mx-auto mt-3 flex">
      <Image
        src={"/logo/code-genius.svg"}
        width={32}
        height={32}
        loading="eager"
        className={"right-8"}
        alt="Code Genius"
      />
      <h1
        className={cn(
          `text-lg sm:text-xl sm:text-xl ml-2 mt-1
        bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text font-sans text-2xl font-bold tracking-tight text-transparent  sm:leading-6`,
          className,
        )}
      >
        Code Genius
      </h1>
    </div>
  )
}
