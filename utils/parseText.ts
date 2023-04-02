export function parseText(text = "", delimiter = "```") {
  const parts = text.split(delimiter)
  const result: any = []
  // console.log("parts:", parts)
  let isInCodeBlock = false
  for (let i = 0; i < parts.length; i++) {
    if (isInCodeBlock) {
      const cleanedParts = parts[i]
        .replace("jsx", "")
        .replace("js", "")
        .replace("vue", "")
        .replace("typescript", "")
        .replace("html", "")
      result.push({ code: cleanedParts })
      isInCodeBlock = false
    } else {
      result.push({ text: parts[i] })
      isInCodeBlock = true
    }
  }
  return result
}
