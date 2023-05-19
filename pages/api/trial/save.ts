import { harperClient } from "lib/harperdb"

export default async function handler(req, res) {
  const bodyRequest = req.body
  const existingRecord = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.Trials WHERE ip = "${bodyRequest.userIP}"`,
  })

  if (
    req.method === "POST" &&
    existingRecord &&
    existingRecord?.[0] &&
    existingRecord?.[0].apiCalls <= 10
  ) {
    //Update operation
    try {
      const payloadToUpdate = {
        ...existingRecord[0],
        ip: bodyRequest.userIP,
        apiCalls: Number(parseInt(existingRecord?.[0]?.apiCalls, 10) + 1),
      }

      const updatedOp = await harperClient({
        operation: "update",
        schema: "Auth",
        table: "Trials",
        hash_values: [
          {
            id: existingRecord?.[0]?.id,
          },
        ],
        records: [payloadToUpdate],
      })

      if (updatedOp.update_hashes?.[0] !== "") {
        return res.status(200).json(payloadToUpdate)
      }
    } catch (error) {
      console.log("error updating user trial", error)
      res.status(500).json({ ok: false, error: error.message })
    }
  } else if (
    existingRecord.length === 0 &&
    req.method === "POST" &&
    bodyRequest.userIP
  ) {
    // console.log("Entra aqui:", bodyRequest)

    //Define a new record with the initial api call.
    const newRecord = {
      ip: bodyRequest.userIP,
      apiCalls: 1,
    }

    const result = await harperClient({
      operation: "insert",
      schema: "Auth",
      table: "Trials",
      records: [newRecord],
    })

    console.log("result:", result)

    return res.status(200).json({ ...newRecord, ok: true })
  }
}
