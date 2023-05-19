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
  }, [])

  return elSnapshot
}

export const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

export async function updateApiCallsAndCredits(
  userId: string,
  tokensCount: number,
) {
  let data: any = {}
  //Update API CALLS
  const response = await fetch("/api/credits/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      tokensCount: tokensCount,
    }),
  })
  const apiCallUpdateResponse = await response.json()

  //Current Credits for the user
  const { credits: oldCredits, apiCalls } = apiCallUpdateResponse

  // check if value is divisible by 5
  if (apiCalls % 2 === 0 && oldCredits > 0) {
    //Decreament credits by 1
    const newCredits = oldCredits - 1

    //Update API CALLS
    const finalResponse = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        updatedUser: {
          ...apiCallUpdateResponse,
          credits: newCredits,
        },
      }),
    })
    data = await finalResponse.json()
  } else {
    data = apiCallUpdateResponse
  }
  return data ? data : {}
}
