import "server-only"
const supportedLocales = ["en", "es", "pt"]

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
}

export const getDictionary = async (locale) => {
  if (!supportedLocales.includes(locale)) {
    locale = "en"
  }

  const functionToCall = dictionaries[locale]
  return await functionToCall()
}
