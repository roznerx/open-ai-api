export function getCodeGeniusPlaceHolder(mode: string) {
  switch (mode) {
    case "smart":
      return "Tip: Use the dropdowns at the bottom to select your language and framework, then ask for code ideas."
    case "test":
      return "Tip: Insert your function, select the desired testing tools, and obtain the test."
    case "improve":
      return "Tip: Paste your function and wait for optimizations and performance improvements."
    case "docs":
      return "Tip: Paste your function or component here and click Generate. Wait for the documentation to appear."
    default:
      return ""
  }
}
