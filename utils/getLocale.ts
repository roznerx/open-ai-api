import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

export function getLocale(acceptLangHeader: string, locales: string[]) {
  let headers = { "accept-language": acceptLangHeader }
  let languages = new Negotiator({ headers }).languages()

  let defaultLocale = "en"
  try {
    return match(languages, locales, defaultLocale)
  } catch (_e) {
    return defaultLocale
  }
}
