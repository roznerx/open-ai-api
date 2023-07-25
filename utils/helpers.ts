import { useEffect, useState } from "react"
import useSSR from "./useSSR"

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

export const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

export async function updateUserSubscription(
  userId: string,
  subscriptionId: string,
) {
  //Update USERR!!!!
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/update`,
      {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          subscriptionId: subscriptionId,
        }),
      },
    )
    const data = await response.json()
    return data ? data : {}
  } catch (error) {
    console.log("There was an ERROR: ", error)
  }
}

const decoder = new TextDecoder()
export function decodeAIStreamChunk(chunk: Uint8Array): string {
  return decoder.decode(chunk)
}
