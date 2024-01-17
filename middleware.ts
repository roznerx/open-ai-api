import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const cspHeader = `
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    script-src 'self' 'nonce-${nonce}' 'unsafe-inline';
    style-src 'self' 'nonce-${nonce}';
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  )

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

  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
