export function getCodeGeniusPlaceHolder(mode: string, translations: any) {
  const translationMap = {
    smart: translations.placeholder.smart,
    test: translations.placeholder.test,
    improve: translations.placeholder.improve,
    docs: translations.placeholder.docs,
  }

  return translationMap[mode] || ""
}
