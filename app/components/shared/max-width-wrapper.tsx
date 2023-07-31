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
    <div className={cn("mx-auto h-full w-full px-2.5", className)}>
      {children}
    </div>
  )
}
