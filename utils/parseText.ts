export function parseText({ text = "", delimiter = "```" }) {
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
