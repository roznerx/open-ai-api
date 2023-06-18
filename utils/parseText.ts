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
