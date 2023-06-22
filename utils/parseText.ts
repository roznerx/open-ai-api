export function parseText({ message, delimiter = "```" }) {
  const parts = message.content.split(delimiter)

  const result: any = []
  let isInCodeBlock = false
  for (let i = 0; i < parts.length; i++) {
    if (isInCodeBlock) {
      result.push({ code: parts[i], role: message.role })
      isInCodeBlock = false
    } else {
      result.push({ text: parts[i], role: message.role })
      isInCodeBlock = true
    }
  }
  return result
}

export function legacyParseText({ text = "", delimiter = "```" }) {
  console.log("text:: in legacy parse:", text)
  const parts = text.split(delimiter)

  const result: any = []
  let isInCodeBlock = false
  for (let i = 0; i < parts.length; i++) {
    if (isInCodeBlock) {
      result.push({ code: parts[i] })
      isInCodeBlock = false
    } else {
      result.push({ text: parts[i] })
      isInCodeBlock = true
    }
  }
  return result
}
