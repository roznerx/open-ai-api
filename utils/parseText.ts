export function parseText({ text = "", delimiter = "```" }) {
  const result: any = []
  const parts = text.split(delimiter)
  let isInCodeBlock = false
  for (let i = 0; i < parts.length; i++) {
    const cleanedParts = parts[i]

    if (isInCodeBlock) {
      result.push({ code: cleanedParts.trim() })
      isInCodeBlock = false
    } else {
      // This is not a code block and it's Pure Text
      result.push({ text: parts[i] })
      isInCodeBlock = true
    }
  }
  return result
}
