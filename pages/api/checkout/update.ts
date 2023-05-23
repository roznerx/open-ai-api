export default async function handler(req, res) {
  //   const bodyRequest = JSON.parse(req.body)
  console.log("bodyReques::", req.body)

  //   const updateOp = await harperClient({
  //     operation: "update",
  //     schema: "Auth",
  //     table: "CheckoutSessions",
  //     hash_values: [
  //       {
  //         id: bodyRequest.id,
  //       },
  //     ],
  //     records: [bodyRequest],
  //   })

  res.status(200).json({ ok: true })
}
