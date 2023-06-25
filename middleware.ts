import { NextRequest, NextResponse } from "next/server"
import { getLocale } from "utils/getLocale"

let locales = ["en", "es", "pt"]

export async function middleware(request: NextRequest) {
  const acceptLangHeader = request.headers.get("accept-language")

  const response = NextResponse.next()

  let ip = request.ip ?? request.headers.get("x-real-ip")
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "Unknown"
  }

  if (ip) {
    response.cookies.set("user-ip", ip, {
      httpOnly: false,
    })
  }

  const locale = getLocale(acceptLangHeader as string, locales)
  console.log("locale:", locale)
  //Set user's locale
  if (locale) {
    response.cookies.set("locale", locale, {
      httpOnly: false,
    })
  }

  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
