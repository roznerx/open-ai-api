import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="mx-auto min-w-[80%] dark:bg-slate-400">{children}</div>
    </>
  )
}
