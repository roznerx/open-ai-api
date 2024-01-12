import { ReactNode } from "react"

export default async function PostLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="flex flex-col">{children}</div>
}
