import { OpenAITurboPayload, OpenAITurboStream } from "../../utils/OpenAIStream"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  runtime: "edge",
}

const handler = async (req: Request): Promise<any> => {
  const {
    messages,
    functions = [
      {
        name: "getMovies",
        description: "Get a collection of movies and it's metadata",
        parameters: {
          type: "string",
          properties: {
            query: {
              type: "string",
              description: "The query string for a movie",
            },
          },
          required: ["query"],
        },
      },
    ],
  } = (await req.json()) as {
    messages?: string[]
    functions?: any
  }

  const payload: OpenAITurboPayload = {
    model: "gpt-3.5-turbo-0613",
    messages,
    functions: functions,
    function_call: "auto",
    stream: true,
  }

  const openAIStream = await OpenAITurboStream(payload)
  return new Response(openAIStream)
}

export default handler
