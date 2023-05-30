export function getCodeGeniusPlaceHolder(mode: string) {
  switch (mode) {
    case "smart":
      return "E.g: Use the dropdowns at the button to select your language and framework. "
    case "test":
      return "Tip: Paste the function for which you want tests to be generated."
    case "improve":
      return "E.g: Improve your code performance by pasting your function here."
    case "docs":
      return "E.g: Create better code by documenting it. Paste your function here."
    default:
      return ""
  }
}
