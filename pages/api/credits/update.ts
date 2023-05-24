import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  const bodyRequest = req.body

  const existingUser = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.Users WHERE id = "${bodyRequest.userId}"`,
  })

  const updatedUser = {
    ...existingUser[0],
    apiCalls: existingUser[0]?.apiCalls
      ? Number(existingUser[0]?.apiCalls) + 1
      : 1,
    tokensCount: existingUser[0]?.tokensCount
      ? Number(existingUser[0]?.tokensCount) + bodyRequest.tokensCount
      : bodyRequest.tokensCount,
  }
  if (existingUser && existingUser[0]) {
    //Update the user API calls
    try {
      const updatedOp = await harperClient({
        operation: "update",
        schema: "Auth",
        table: "Users",
        hash_values: [
          {
            id: existingUser[0]?.id,
          },
        ],
        records: [updatedUser],
      })

      if (updatedOp.update_hashes[0] !== "") {
        return res.status(200).json(updatedUser)
      }
    } catch (error) {
      console.log("error updating user credits", error)
      res.status(500).json({ error: true, message: error.message })
    }
  }
}
