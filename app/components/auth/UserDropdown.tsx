"use client"

import UserMenu from "./UserMenu"

export default function UserDropdown({ session, translations }) {
  const { email, image } = session?.user || {}

  if (!email) return null

  return (
    <UserMenu
      translations={translations}
      session={session}
      email={email}
      image={image}
    />
  )
}
