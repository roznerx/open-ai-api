export function getCodeGeniusPlaceHolder(mode: string, translations: any) {
  console.log("trans", translations)

  switch (mode) {
    case "smart":
      return translations.placeholder.smart
    case "test":
      return translations.placeholder.test
    case "improve":
      return translations.placeholder.improve
    case "docs":
      return translations.placeholder.docs
    default:
      return ""
  }
}
