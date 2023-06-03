"use client"

import UserMenu from "./UserMenu"

export default function UserDropdown({ session }) {
  const { email, image } = session?.user || {}

  if (!email) return null

  return <UserMenu session={session} email={email} image={image} />
}
