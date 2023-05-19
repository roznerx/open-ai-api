export function getCodeGeniusPlaceHolder(mode: string) {
  switch (mode) {
    case "smart":
      return "Share your code idea and let Code Genius provide you with suggestions"
    case "test":
      return "Need unit tests? Paste your code and let Code Genius do the work"
    case "improve":
      return "Generate better code with Code Genius - paste your function now and get code improvements"
    case "docs":
      return "Paste your code here and Code Genius will document it for you"
    default:
      return ""
  }
}
