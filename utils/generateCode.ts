/* eslint-disable unused-imports/no-unused-vars */

export async function generateCodeWithTurbo(
  reader,
  codeMessages,
  setReader,
  setGeneratedCode,
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
        setGeneratedCode((prev) => prev + "<>")
      }
    }
  } catch (error) {
    return `There was an error with your request ${error}`
  } finally {
    setReader(null)
    //RESET TOKENS COUNT.
    tokensCount = 0
    //✨ Make some credits update Magic ✨
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

export async function generateCode({
  setReader,
  setGeneratedCode,
  codeMessages,
  setUserHasAResponse,
  setLoading,
}: {
  setReader?: (reader: any) => void
  setGeneratedCode: any
  codeMessages?: any
  setUserHasAResponse?: (hasResponse: boolean) => void
  setLoading?: (loading: boolean) => void
}) {
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

    // setCreditsModaIsOpen(true)

    //RESET TOKENS COUNT.
    tokensCount = 0
  }
}
