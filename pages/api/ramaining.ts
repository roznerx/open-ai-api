import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

import { harperClient } from "@/lib/harperdb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check if user is logged in
  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user) {
    console.log("User not logged in")
    return res
      .status(401)
      .json({ message: "Login to start coding like a Genius." })
  }

  // Query the database by email to get the number of generations left
  const user = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.Users WHERE email = "${session.user.email}"`,
  })

  return res.status(200).json({ remainingCredits: user[0]?.credits })
}
