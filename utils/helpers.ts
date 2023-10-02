export const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

export async function updateUserSubscription(
  userId: string,
  subscriptionId: any,
) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/update`,
      {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          subscriptionId,
        }),
      },
    )
    const data = await response.json()

    return data ? data : {}
  } catch (error) {
    console.log("There was an ERROR: ", error)
  }
}

const decoder = new TextDecoder()
export function decodeAIStreamChunk(chunk: Uint8Array): string {
  return decoder.decode(chunk)
}
