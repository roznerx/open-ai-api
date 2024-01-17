"use client"

import { sendMarketingEmail } from "@/lib/emails"
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react"

interface User {
  id: number
  name: string
  credits?: string
  email: string
}

export default function UsersTable({ users }: { users: User[] }) {
  const sendEmail = async (email, name) => {
    const payload = {
      isNewUser: true,
      name,
      email,
    }
    sendMarketingEmail(payload)
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Credits</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.credits}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
            <TableCell>
              <button
                onClick={() => sendEmail(user.email, user.name)}
                className="h-12 w-32 rounded-lg bg-black p-4 text-white"
              >
                Send Email
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
