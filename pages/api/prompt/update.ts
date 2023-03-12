import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  const bodyRequest = JSON.parse(req.body)
  console.log("bodyReques::", bodyRequest)

  const updateOp = await harperClient({
    operation: "update",
    schema: "Auth",
    table: "UserPrompts",
    hash_values: [
      {
        id: "53b9b4f3-a583-4031-abf8-1241ef92db48",
      },
    ],
    records: [bodyRequest],
  })
  console.log("🚀 - updateOp:", updateOp)

  res.status(200).json({ ok: true })
}
