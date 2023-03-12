import { Adapter } from "next-auth/adapters"
import { harperClient } from "lib/harperdb"

export function HarperDBAdapter(): Adapter {
  return {
    async createUser(user) {
      const existing = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE email = "${user.email}"`,
      })

      if (existing && existing[0]) return existing[0]

      const result = await harperClient({
        operation: "insert",
        schema: "Auth",
        table: "Users",
        records: [user],
      })

      if (result.error) {
        console.log(`Failed to create User: ${result.error}`)
        throw new Error("Failed to create User")
      }

      return result
    },
    async createVerificationToken({ identifier, expires, token }) {
      const data = { identifier, expires, token }
      const existingToken = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.VerificationRequests WHERE token = "${token}"`,
      })

      if (existingToken && existingToken[0]) return existingToken[0]

      const result = await harperClient({
        operation: "insert",
        schema: "Auth",
        table: "VerificationRequests",
        records: [data],
      })

      if (result.error) {
        console.log(`Failed to create Token: ${result.error}`)
        throw new Error("Failed to create Token")
      }

      return {
        ...data,
        id: result.inserted_hashes[0],
      }
    },
    async useVerificationToken({ token }) {
      const existingToken = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.VerificationRequests WHERE token = "${token}"`,
      })
      return existingToken && existingToken[0]
    },
    async getUser(id) {
      const user = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE id = "${id}"`,
      })
      return user && user[0]
    },
    async getUserByEmail(email) {
      const user = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE email = "${email}"`,
      })
      return user && user[0]
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Accounts WHERE provider = "${provider}" AND providerAccountId = "${providerAccountId}"`,
      })

      if (!account || !account[0]) return

      const user = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE id = "${account[0].userId}"`,
      })

      return user && user[0]
    },
    async updateUser(updatedUser) {
      const existing = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE id = "${updatedUser.id}"`,
      })

      if (!existing || !existing[0]) {
        throw new Error(
          `Can not update user ${updatedUser.id}; Unable to find user.`,
        )
      }

      const user = {
        ...existing[0],
        ...updatedUser,
      }

      await harperClient({
        operation: "update",
        schema: "Auth",
        table: "Users",
        hash_values: [user],
      })

      return user
    },

    async linkAccount(account) {
      console.log("🚀 - account::", account)

      const userExist = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE id = "${account.userId}"`,
      })

      if (userExist[0] && userExist[0]?.id === account.userId) {
        //Do nothing
        return
      }
      //Create the user in the Accounts table.
      await harperClient({
        operation: "insert",
        schema: "Auth",
        table: "Accounts",
        records: [account],
      })
      return account
    },

    async createSession(session) {
      await harperClient({
        operation: "insert",
        schema: "Auth",
        table: "Sessions",
        records: [session],
      })
      return session
    },

    async getSessionAndUser(sessionToken) {
      const session = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Sessions WHERE sessionToken = "${sessionToken}"`,
      })

      if (!session || !session[0]) return

      const user = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Users WHERE id = "${session[0]?.userId}"`,
      })

      // if (!user || !user[0]) return
      if (session && user) {
        return { session: session[0], user: user[0] }
      }
      return { ...user, ...session }
    },

    async updateSession(session) {
      const existing = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Sessions WHERE sessionToken = "${session.sessionToken}"`,
      })

      if (!existing || !existing[0]) {
        throw new Error(
          `Can not update sessesion ${session?.sessionToken}; Unable to find session.`,
        )
      }

      const result = await harperClient({
        operation: "update",
        schema: "Auth",
        table: "Sessions",
        hash_values: [
          {
            id: existing.id,
            ...session,
          },
        ],
      })

      return result
    },
    async deleteSession(sessionToken) {
      const existing = await harperClient({
        operation: "sql",
        sql: `SELECT * FROM Auth.Sessions WHERE sessionToken = "${sessionToken}"`,
      })

      if (!existing || !existing[0]) {
        throw new Error(
          `Can not delete sessesion ${sessionToken}; Unable to find session.`,
        )
      }

      await harperClient({
        operation: "delete",
        schema: "Auth",
        table: "Sessions",
        hash_values: [existing.id],
      })
    },
  }
}
