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
    functions: [],
    stream = true
  } = (await req.json()) as {
      messages?: string[]
      functions?: any
      stream?: boolean
  }

  const payload: OpenAITurboPayload = {
    model: "gpt-3.5-turbo-0613",
    messages,
    stream,
  }

  const openAIStream: any = await OpenAITurboStream(payload)
  
  return new Response(openAIStream)
}

export default handler
