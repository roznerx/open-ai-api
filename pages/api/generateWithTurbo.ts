import { OPEN_API } from "@/lib/constants"
import {
  OpenAIStream,
  OpenAIStreamPayload,
  OpenAITurboPayload,
  OpenAITurboStream,
} from "../../utils/OpenAIStream"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  runtime: "edge",
}

export const generateTurboMessage = (
  userInput = "How to send an openai api request",
) => {
  const messages = [
    {
      role: "system",
      content: `You are an experienced software engineer. Don't use \`\`\` followed by the programming language, before outputting code.`,
    },
    { role: "user", content: userInput },
  ]
  return messages
}

const handler = async (req: Request): Promise<any> => {
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  const payload: OpenAITurboPayload = {
    model: "gpt-3.5-turbo",
    messages: generateTurboMessage(prompt),
    stream: true,
  }

  const openAIStream = await OpenAITurboStream(payload)
  return new Response(openAIStream)
}

export default handler
