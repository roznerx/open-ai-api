import { harperClient } from "@/lib/harperdb"
import { SandpackProvider } from "@codesandbox/sandpack-react"

import Editor from "./editor"

export default async function Page() {
  const codeSnippets = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.UserPrompts WHERE 
    id = "7b6a8327-eb4a-49dc-bbd6-4c42db324844"`,
  })
  const { questionName, prompt, id } = codeSnippets && codeSnippets[0]

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="bg-white">
        <Editor prompt={prompt} questionName={questionName} id={id} />
      </div>
    </div>
  )
}
