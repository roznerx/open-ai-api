export function getCodeGeniusPlaceHolder(mode: string) {
  switch (mode) {
    case "smart":
      return "E.g: 'I want to create a Chat App'. Tip: Use the dropdowns at the button to select your language and framework. 🧞‍♂️"
    case "test":
      return "E.g: Generate tests for your code by pasting the function here."
    case "improve":
      return "E.g: Improve your code performance by pasting your function here."
    case "docs":
      return "E.g: Create better code by documenting it. Paste your function here."
    default:
      return ""
  }
}
