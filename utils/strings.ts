export function getCodeGeniusPlaceHolder(mode: string) {
  switch (mode) {
    case "smart":
      return "Tip: Use the dropdowns at the bottom to select your language and framework, then ask for code ideas."
    case "test":
      return "Tip: Use the dropdowns at the corner left bottom to select your language and framework, then paste your function here and click Generate."
    case "improve":
      return "Tip: Paste your function or component here and click Generate. Wait for the suggestions to appear."
    case "docs":
      return "Tip: Paste your function or component here and click Generate. Wait for the documentation to appear."
    default:
      return ""
  }
}
