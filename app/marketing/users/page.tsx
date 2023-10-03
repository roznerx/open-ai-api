import { harperClient } from "@/lib/harperdb"
import { Card, Title, Text } from "@tremor/react"

import Search from "../components/search"
import UsersTable from "../components/table"

export const dynamic = "force-dynamic"

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const search = searchParams.q ?? ""
  const harperUsers = await harperClient(
    {
      operation: "sql",
      sql: `SELECT * FROM Auth.Users as U WHERE U.name LIKE '%${search}%' ORDER BY U.credits ASC`,
    },
    false,
  )
  // console.log("harperUsers:", harperUsers)

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={harperUsers} />
      </Card>
    </main>
  )
}
