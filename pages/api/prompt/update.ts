import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  const bodyRequest = JSON.parse(req.body)
  console.log("bodyReques::", bodyRequest)

  await harperClient({
    operation: "update",
    schema: "Auth",
    table: "UserPrompts",
    hash_values: [
      {
        id: bodyRequest.id,
      },
    ],
    records: [bodyRequest],
  })

  res.status(200).json({ ok: true })
}
