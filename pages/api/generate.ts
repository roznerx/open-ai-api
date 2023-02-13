import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };
  console.log("🚀 - prompt, model, temperature, max_tokens, stream", prompt);
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 4000,
    stream: true,
    n: 1,
  };
  const openAIStream = await OpenAIStream(payload);
  console.log("🚀 - openAIStream", openAIStream);

  return new Response(openAIStream);
};

export default handler;
