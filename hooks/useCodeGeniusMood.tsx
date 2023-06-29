import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useCodeGeniusMood = (translations) => {
  const searchParams = useSearchParams()
  const [codeGeniusMood, setCodeGeniusMood] = useState("")

  useEffect(() => {
    if (searchParams) {
      const mode: any = searchParams.get("mode") || "smart"
      if (mode === "smart") {
        setCodeGeniusMood(translations.mode.smart)
      } else if (mode === "test") {
        setCodeGeniusMood(translations.mode.test)
      } else if (mode === "improve") {
        setCodeGeniusMood(translations.mode.improve)
      } else if (mode === "docs") {
        setCodeGeniusMood(translations.mode.docs)
      }
    }
  }, [searchParams, translations.mode])

  return codeGeniusMood
}

export default useCodeGeniusMood
