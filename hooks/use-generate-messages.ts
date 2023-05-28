"use client"

import { ModeTypes } from "app/code-idea/container"
import { useEffect, useRef } from "react"

export default function useGeneratedMessages(mode: ModeTypes, prompt: string) {
  const codeMessages = useRef([
    {
      role: "system",
      content: "",
    },
  ])

  useEffect(() => {
    //Read posible modes from code
    switch (mode) {
      case "smart":
        codeMessages.current[0].content =
          "You are an AI software development assistant which is specialized in providing code ideas/suggestions."
        break
      case "test":
        codeMessages.current[0].content =
          "You are a helpful and specialized AI software assistant with experience in unit testing, integration and e2e testing."
        break
      case "improve":
        codeMessages.current[0].content =
          "You are a helpful and specialized AI software assistant which is specialized in code performance and customization."
        break
      case "docs":
        codeMessages.current[0].content =
          "You are an AI software assistant which is specialized in providing code documentation. Requeriments: Use short sentences to make it easy to read (max 20 words per line)."
        break

      default:
        codeMessages.current[0].content =
          "You are an AI software development assistant which is specialized in providing code ideas/suggestions."

        break
    }
  }, [mode])

  useEffect(() => {
    if (prompt) {
      codeMessages.current.push({
        ...codeMessages.current,
        role: "user",
        content: prompt,
      })
    }
  }, [prompt])

  return codeMessages
}
