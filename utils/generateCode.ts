/* eslint-disable unused-imports/no-unused-vars */

import { updateApiCallsAndCredits } from "./helpers"

export async function generateCodeWithTurbo(
  reader,
  codeMessages,
  setReader,
  setGeneratedCode,
  functions,
  functionsMessage,
  setCodeSentence,
  setIsLoading
) {
  const response = await fetch("/api/generateWithTurbo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [...codeMessages.current, functionsMessage],
      functions,
      stream: true,
    }),
  })

  if (!response.ok) {
    throw Error(response.statusText)
  }

  // This data is a ReadableStream
  const data = response.body

  if (!data) {
    throw Error(response.statusText)
  }

  const newReader = data.getReader()
  if (!reader) {
    setReader(newReader)
  }
  const decoder = new TextDecoder()
  let done = false
  setCodeSentence('')
  setIsLoading(false)
  try {
    while (!done) {
      const { value, done: doneReading } = await newReader.read()
      done = doneReading

      let chunkValue = decoder.decode(value)

      setGeneratedCode((prev) => prev + chunkValue)
      if (done) {
        setGeneratedCode((prev) => prev)
      }
    }
  } catch (error) {
    return `There was an error with your request ${error}`
  } finally {
    setGeneratedCode((prev) => prev + "<>")
    setReader(null)
  }
}


export async function generateCode({
  setReader,
  setGeneratedCode,
  codeMessages,
  userId,
  setUserHasAResponse,
  setCreditsLeft,
  setCreditsModaIsOpen,
  setLoading,
}: {
  setReader?: (reader: any) => void
  setGeneratedCode: any
  codeMessages?: any
  userId?: string
  setUserHasAResponse?: (hasResponse: boolean) => void
  setCreditsLeft?: (creditsLeft: number) => void
  setCreditsModaIsOpen?: (isOpen: boolean) => void
  setLoading?: (loading: boolean) => void
}) {
  const response = await fetch("/api/generateWithTurbo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [...codeMessages.current],
      stream: true,
    }),
  })


  if (!response.ok) {
    return
  }

  // This data is a ReadableStream
  const data = response.body

  if (!data) {
    return
  }

  const newReader = data.getReader()
  //Set Reader
  if (typeof setReader === "function") {
    setReader(newReader)
  }
  //Text decoder
  const decoder = new TextDecoder()

  let done = false
  let tokensCount = 0
  try {
    while (!done) {
      const { value, done: doneReading } = await newReader.read()
      done = doneReading
      tokensCount++
      let chunkValue = decoder.decode(value)
      setGeneratedCode((prev) => prev + chunkValue)

      if (done) {
        setGeneratedCode((prev) => prev + "<>")
      }
    }
  } catch (error) {
    return `There was an error with your request ${error}`
  } finally {
    if (typeof setReader === "function") {
      setReader(null)
    }
    if (typeof setLoading === "function") {
      setLoading(false)
    }

    if (typeof setUserHasAResponse === "function") {
      setUserHasAResponse(true)
    }
    //✨ Make some credits update Magic ✨
    if (userId) {
      const data = await updateApiCallsAndCredits(userId)
      if (data?.creditsLeft === 0 && setCreditsLeft && setCreditsModaIsOpen) {
        setCreditsLeft(0)
        setCreditsModaIsOpen(true)
      }
    }

    //RESET TOKENS COUNT.
    tokensCount = 0
  }
}
