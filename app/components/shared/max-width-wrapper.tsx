import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "mx-auto  w-full bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-black via-violet-800 to-fuchsia-600/70 px-2.5",
        className,
      )}
    >
      {children}
    </div>
  )
}
