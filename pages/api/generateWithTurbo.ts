import { OpenAITurboPayload, OpenAITurboStream } from "../../utils/OpenAIStream"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  runtime: "edge",
}

// export const generateTurboMessage = (
//   userInput = "How to send an openai api request",
// ) => {
//   const messages = [
//     {
//       role: "system",
//       content: `You are an AI programming assistant. - Follow the user's requirements carefully & to the letter.
//       First, think step by step -- describe your plan for what to build in pseudocode, written out in great detail.
//       -Then output the code in a single code block`,
//     },
//     { role: "user", content: userInput },
//   ]
//   return messages
// }

const handler = async (req: Request): Promise<any> => {
  const { messages } = (await req.json()) as {
    messages?: []
  }

  console.log("messages::", messages)

  const payload: OpenAITurboPayload = {
    model: "gpt-3.5-turbo",
    messages,
    stream: true,
  }

  const openAIStream = await OpenAITurboStream(payload)
  return new Response(openAIStream)
}

export default handler
