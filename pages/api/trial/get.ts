import { harperClient } from "lib/harperdb"

export default async function handler(req) {
  const bodyRequest = req.body
  const existingRecord = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.Trials WHERE ip = "${bodyRequest.userIP}"`,
  })
  console.log("existingRecord:", existingRecord)

  // return res.status(200).json({ ...newRecord, ok: true })
}
