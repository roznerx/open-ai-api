export function getCodeGeniusPlaceHolder(mode: string) {
  switch (mode) {
    case "smart":
      return "E.g: 'I want to create a Chat App'. Tip: Use the dropdowns at the button to select your language and framework. 🧞‍♂️"
    case "test":
      return "E.g: Generate tests for your code by pasting the function or component here."
    case "improve":
      return "E.g: Improve your performance code by pasting your function or component here."
    case "docs":
      return "E.g: Create better code by documenting it. Paste your function or component here."
    default:
      return ""
  }
}
