export function parseText(text = "", delimiter = "```") {
  const parts = text.split(delimiter)
  // console.log("parts with delimiter:", parts)
  const result: any = []
  let isInCodeBlock = false
  for (let i = 0; i < parts.length; i++) {
    const cleanedParts = parts[i]

    if (isInCodeBlock) {
      cleanedParts
        .replace("js", "")
        .replace("jsx", "")
        .replace("x", "")
        .replace("java", "")
        .replace("type", "")
        .replace("vue", "")
        .replace("script", "")
        .replace("typescript", "")
        .replace("javascript", "")
        .replace("html", "")
        .trim()
      result.push({ code: cleanedParts })
      isInCodeBlock = false
    } else {
      // console.log("Text Parts", parts[i])
      result.push({ text: parts[i] })
      isInCodeBlock = true
    }
  }
  return result
}
