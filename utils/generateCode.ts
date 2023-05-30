import { updateApiCallsAndCredits } from "./helpers"

export async function generateCodeWithTurbo(
  reader,
  codeMessages,
  setReader,
  setGeneratedCode,
  userId = null,
  setCreditsModaIsOpen,
) {
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
    return
  }

  // This data is a ReadableStream
  const data = response.body

  if (!data) {
    return
  }

  const newReader = data.getReader()
  if (!reader) {
    setReader(newReader)
  }
  const decoder = new TextDecoder()
  let done = false
  let tokensCount = 0
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
  setReader: any,
  setGeneratedCode: any,
  codeMessages: any,
  userId: any,
  setUserHasAResponse?: any,
  setCreditsLeft?: any,
  setCreditsModaIsOpen?: any,
) {
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
    return
  }

  // This data is a ReadableStream
  const data = response.body

  if (!data) {
    return
  }

  const newReader = data.getReader()
  //Set Reader
  setReader(newReader)
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
      // console.log("chunkValue: ", chunkValue)

      setGeneratedCode((prev) => prev + chunkValue)

      if (done) {
        setGeneratedCode((prev) => prev + "<>")
      }
    }
  } catch (error) {
    return `There was an error with your request ${error}`
  } finally {
    setReader(null)
    if (typeof setUserHasAResponse === "function") {
      setUserHasAResponse(true)
    }
    //✨ Make some credits update Magic ✨
    const data = await updateApiCallsAndCredits(userId, tokensCount)

    if (data?.creditsLeft === 0 && setCreditsLeft && setCreditsModaIsOpen) {
      setCreditsLeft(0)
      setCreditsModaIsOpen(true)
    }

    //RESET TOKENS COUNT.
    tokensCount = 0
  }
}
