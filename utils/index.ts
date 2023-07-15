import { customAlphabet } from "nanoid"

// 7-character random string
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
)

export function createChunkDecoder() {
  const decoder = new TextDecoder()
  return function (chunk: Uint8Array | undefined): string {
    if (!chunk) return ""
    return decoder.decode(chunk, { stream: true })
  }
}

export function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    // For Firefox
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    // For Chrome, Safari, and Opera
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    // For Internet Explorer and Edge
    element.msRequestFullscreen()
  }
}
