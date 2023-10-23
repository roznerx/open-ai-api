import { useCallback, useEffect, useState } from "react"
import useSSR from "./useSSR"
import { getId } from "./helpers"

export const createElement = (id: string): HTMLElement => {
  const el = document.createElement("div")
  el.setAttribute("id", id)
  return el
}

export const usePortal = (selectId: string = getId()): HTMLElement | null => {
  const id = `zeit-ui-${selectId}`
  const { isBrowser } = useSSR()
  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null,
  )

  useEffect(() => {
    const hasElement = document.querySelector<HTMLElement>(`#${id}`)
    const el = hasElement || createElement(id)

    if (!hasElement) {
      document.body.appendChild(el)
    }
    setElSnapshot(el)
  }, [id])

  return elSnapshot
}

export type UseClipboardOptions = {
  onError: Function
}

export type UseClipboardResult = {
  copy: (text: string) => void
}

const defaultOptions: UseClipboardOptions = {
  onError: () => console.log("Failed to copy.", "use-clipboard"),
}

const useClipboard = (
  options: UseClipboardOptions = defaultOptions,
): UseClipboardResult => {
  const el = usePortal("clipboard")

  const copyText = (el: HTMLElement | null, text: string) => {
    if (!el || !text) return
    const selection = window.getSelection()
    console.log("selection:", selection)
    if (!selection) return

    el.style.whiteSpace = "pre"
    el.textContent = text

    const range = window.document.createRange()
    selection.removeAllRanges()
    range.selectNode(el)
    selection.addRange(range)
    try {
      window.document.execCommand("copy")
    } catch (e) {
      options.onError && options.onError()
    }

    selection.removeAllRanges()
    if (el) {
      el.textContent = ""
    }
  }

  const copy = useCallback(
    (text: string) => {
      copyText(el, text)
    },
    [el],
  )

  return { copy }
}

export default useClipboard
