export const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

const decoder = new TextDecoder()
export function decodeAIStreamChunk(chunk: Uint8Array): string {
  return decoder.decode(chunk)
}
