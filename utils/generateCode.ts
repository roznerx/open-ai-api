export async function generateCodeWithTurbo(
  codeMessages,
  setLoading,
  setReader,
  setGeneratedCode,
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

  // console.log("response", response);
  // clear timeout
  // clearTimeout(id)

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
  }
}
