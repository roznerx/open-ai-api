import { NextRequest, NextResponse } from "next/server"
import { getLocale } from "utils/getLocale"

let locales = ["en-US", "es", "pt"]

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

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(acceptLangHeader as string, locales)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }

  return response
}
