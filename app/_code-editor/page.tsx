import { harperClient } from "#/lib/harperdb"

import Editor from "./editor"

export default async function Page() {
  const codeSnippets = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.UserPrompts WHERE id = "1bbfc507-c3f1-4080-aa47-7b9551211e5b"`,
  })
  const { questionName, prompt, id } = (codeSnippets && codeSnippets[0]) || {}

  return (
    <div className="flex min-h-screen w-full flex-row items-start justify-center sm:justify-start">
      {/* <SideBar /> */}
      <div className="relative mt-12 w-[95%] sm:mx-4 sm:w-full">
        <Editor prompt={prompt} questionName={questionName} id={id} />
      </div>
    </div>
  )
}
