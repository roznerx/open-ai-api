import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react"
import { useEffect } from "react"

export default function SaveCode({
  isSaving,
  isReseting,
  setIsReseting,
  id,
  questionName,
  setIsSaving,
}) {
  const { sandpack } = useSandpack()
  const { files, activeFile, resetFile } = sandpack

  const code = files[activeFile].code

  useEffect(() => {
    if (code && isSaving) {
      console.log("all good")
      const payload = {
        id,
        questionName,
        prompt: code,
      }
      console.log("payload", payload)
      fetch("/api/prompt/update", {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => console.log("res:", res))
        .finally(() => setIsSaving(false))
    }
  }, [isSaving, code])
  useEffect(() => {
    if (isReseting) {
    }
  }, [isReseting])
  if (isSaving) {
    return <p>"Saving.."</p>
  }
  if (isReseting) {
    resetFile("/App.tsx")
    setIsReseting(false)
  }
  return null
}
