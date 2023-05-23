import { Loader2 } from "lucide-react"

export default function Loading({ size = 24 }) {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <Loader2 size={size} color="white" className="h-8 w-8 animate-spin" />
    </div>
  )
}
