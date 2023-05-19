import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  let ip = request.ip ?? request.headers.get("x-real-ip")
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "Unknown"
  }

  const response = NextResponse.next()

  if (ip) {
    response.cookies.set("user-ip", ip, {
      httpOnly: false,
    })
  }
  return response
}
