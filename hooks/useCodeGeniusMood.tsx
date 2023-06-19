import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useCodeGeniusMood = () => {
  const searchParams = useSearchParams()
  const [codeGeniusMood, setCodeGeniusMood] = useState("")

  useEffect(() => {
    if (searchParams) {
      const mode: any = searchParams.get("mode") || "smart"
      if (mode === "smart") {
        setCodeGeniusMood("Suggestions")
      } else if (mode === "test") {
        setCodeGeniusMood("Testing")
      } else if (mode === "improve") {
        setCodeGeniusMood("Optimization")
      } else if (mode === "docs") {
        setCodeGeniusMood("Documentation")
      }
    }
  }, [searchParams])

  return codeGeniusMood
}

export default useCodeGeniusMood
