import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser"

export interface OpenAIStreamPayload {
  model: string
  prompt: string
  stop?: string | []
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}
export interface OpenAITurboPayload {
  model: string
  messages?: string[]
  functions?: []
  function_call: string
  top_p?: number
  stream?: boolean
  temperature?: number
}

const fetchOptions = { method: "GET", headers: { accept: "application/json" } }
const MOVIES_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f"

// Function to fetch movies from the API
async function fetchMovies(searchTerm) {
  const response = await fetch(
    `${MOVIES_ENDPOINT}&query=${searchTerm}`,
    fetchOptions,
  )
  const data = await response.json()
  return data
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  })

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].text
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}

export async function OpenAITurboStream(payload: OpenAITurboPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res: any = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  })

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close()
            return
          }
          try {
            //Handle API response.
            const json = JSON.parse(data)
            if (json.choices[0]["finish_reason"] === "function_call") {
              const functionName = json.choices[0].message.function_call.name
              return {
                finish_reason: "function_call",
                functionName,
              }
            }

            const text = json.choices[0].delta.content
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            // counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream

  // Log the generated text from the GPT-3 and GPT-3.5-Turbo models to the console
}
