import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  let ip = request.ip ?? request.headers.get("x-real-ip")
  // console.log("Headers:", request.headers)
  // console.log("ip:", ip)
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
