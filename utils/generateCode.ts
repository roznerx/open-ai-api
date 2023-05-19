import { updateApiCallsAndCredits } from "./helpers"

export async function generateCodeWithTurbo(
  codeMessages,
  setLoading,
  setReader,
  setGeneratedCode,
  userId = null,
  setCreditsModaIsOpen,
) {
  setLoading(true)
  const response = await fetch("/api/generateWithTurbo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [...codeMessages.current],
    }),
  })

  if (!response.ok) {
    setLoading(false)
    return
  }

  // This data is a ReadableStream
  const data = response.body

  if (!data) {
    setLoading(false)
    return
  }

  const reader = data.getReader()
  setReader(reader)
  const decoder = new TextDecoder()
  let done = false
  let tokensCount = 0
  try {
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading

      let chunkValue = decoder.decode(value)

      setGeneratedCode((prev) => prev + chunkValue)
      if (done) {
        setGeneratedCode((prev) => prev + "<>")
        setLoading(false)
      }
    }
  } catch (error) {
    return `There was an error with your request ${error}`
  } finally {
    setLoading(false)
    setReader(null)
    //✨ Make some credits update Magic ✨
    if (userId) {
      const data = await updateApiCallsAndCredits(userId, tokensCount)

      if (data?.creditsLeft === 0) {
        setCreditsModaIsOpen(true)
      }

      //RESET TOKENS COUNT.
      tokensCount = 0
    }
  }
}

export const fetchWithTurbo = async (
  assintanceMood: string,
  prompt: string,
) => {
  const response = await fetch("/api/generateWithTurbo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: assintanceMood,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })
  return response
}

export async function generateCode(
  setLoading,
  setReader,
  setGeneratedCode,
  codeMessages,
  userId,
) {
  setLoading(true)

  const response = await fetch("/api/generateWithTurbo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [...codeMessages.current],
    }),
  })

  if (!response.ok) {
    setLoading(false)
    return
  }

  // This data is a ReadableStream
  const data = response.body

  if (!data) {
    setLoading(false)
    return
  }

  const reader = data.getReader()
  //Set Reader
  setReader(reader)
  //Text decoder
  const decoder = new TextDecoder()

  let done = false
  let tokensCount = 0
  try {
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      tokensCount++
      let chunkValue = decoder.decode(value)
      // console.log("chunkValue: ", chunkValue)

      setGeneratedCode((prev) => prev + chunkValue)

      console.log("Generated: ", generateCode)

      if (done) {
        setGeneratedCode((prev) => prev + "<>")
        setLoading(false)
      }
    }
  } catch (error) {
    return `There was an error with your request ${error}`
  } finally {
    setLoading(false)
    setReader(null)
    //✨ Make some credits update Magic ✨
    const data = await updateApiCallsAndCredits(userId, tokensCount)

    if (data?.creditsLeft === 0) {
      alert("You have no more credits left. Please purchase more credits.")
    }

    //RESET TOKENS COUNT.
    tokensCount = 0
  }
}
