// ./app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = "nodejs"

export async function POST(req) {
  const formData = await req.formData()
  const data = formData.get("data")
  // console.log("data:", data)

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "assistant",
        //@ts-ignore
        content: [
          {
            type: "text",
            text: "You are a helpful assistant that interprets images and respond with equivalent React code",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: data,
            },
          },
        ],
      },
    ],
  })
  console.log("response.choices[0]", response.choices[0])

  return NextResponse.json(response.choices[0])
}
