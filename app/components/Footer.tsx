"use client"

import { usePathname } from "next/navigation"

export default function Footer() {
  const pathName = usePathname()
  const showFooter = pathName !== "/code-chat"
  return showFooter ? (
    <footer className="pt-4sm:mb-0 mt-5 mb-3 flex h-16 w-full flex-col items-center space-y-3 px-3 sm:h-20 sm:flex-row sm:pt-2">
      <div className="m-auto content-center">
        <p>AI - Intelligent Code ®</p>
      </div>
    </footer>
  ) : null
}
