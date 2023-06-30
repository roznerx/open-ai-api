import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname

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
