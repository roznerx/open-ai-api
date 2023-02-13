import { harperClient } from "lib/harperdb";

export default async function handler(req, res) {
  const bodyRequest = JSON.parse(req.body);
  const response = await harperClient({
    operation: "insert",
    schema: "Auth",
    table: "UserPrompts",
    records: [bodyRequest],
  });
  console.log("response:::", response);

  res.status(200).json({ ok: true });
}
