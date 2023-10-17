import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  const bodyRequest = req.body

  const existingUser = await harperClient(
    {
      operation: "sql",
      sql: `SELECT * FROM Auth.Users WHERE id = "${bodyRequest.userId}"`,
    },
    false,
  )

  const payloadToUpdate = {
    ...existingUser[0],
    isPremium: bodyRequest.isPremium,
    subscriptionId: bodyRequest.subscriptionId,
  }

  if (existingUser && existingUser[0]) {
    //Update the user Object
    try {
      const updatedOp = await harperClient(
        {
          operation: "update",
          schema: "Auth",
          table: "Users",
          hash_values: [
            {
              id: existingUser[0]?.id,
            },
          ],
          records: [payloadToUpdate],
        },
        false,
      )

      if (updatedOp.update_hashes[0] !== "") {
        return res.status(200).json({ user: payloadToUpdate })
      }
      return res.status(200).json({ ok: true })
    } catch (error) {
      console.log("error updating user credits", error)
      res.status(500).json({ ok: false, error: error.message })
    }
  }
}
