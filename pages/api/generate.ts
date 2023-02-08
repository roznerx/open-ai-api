import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt, model, temperature, max_tokens, stream } =
    (await req.json()) as {
      prompt?: string;
      model: string;
      temperature: number;
      max_tokens: number;
      stream: boolean;
    };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model,
    prompt,
    temperature,
    max_tokens,
    stream,
    n: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const openAIStream = await OpenAIStream(payload);
  return new Response(openAIStream);
};

export default handler;
