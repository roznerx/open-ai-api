import { ReactNode } from "react"

export default async function PostLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="flex w-screen flex-col ">{children}</div>
}
