"use client"

import UserMenu from "./UserMenu"

export default function UserDropdown({ session }) {
  const { email, image } = session?.user || {}

  // Dark vs Light Mode
  // useEffect(() => {
  //   try {
  //     if (colorMode === "dark") {
  //       document.getElementsByTagName("html")[0].classList.add("dark")
  //     } else {
  //       document.getElementsByTagName("html")[0].classList.remove("dark")
  //     }
  //   } catch (_) {}
  // }, [colorMode])

  if (!email) return null

  return <UserMenu session={session} email={email} image={image} />
}
