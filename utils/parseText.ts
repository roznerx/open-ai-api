export function parseText({ text = "", delimiter = "```" }) {
  const parts = text.split(delimiter)
  // console.log("parts with delimiter:", parts)
  const result: any = []
  let isInCodeBlock = false
  for (let i = 0; i < parts.length; i++) {
    const cleanedParts = parts[i]

    if (isInCodeBlock) {
      result.push({ code: cleanedParts.trim() })
      isInCodeBlock = false
    } else {
      // console.log("Text Parts", parts[i])
      result.push({ text: parts[i] })
      isInCodeBlock = true
    }
  }
  return result
}
