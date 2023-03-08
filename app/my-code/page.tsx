import { harperClient } from "@/lib/harperdb";
import { SandpackProvider } from "@codesandbox/sandpack-react";

import Editor from "./editor";

export default async function Page() {
  const codeSnippets = await harperClient({
    operation: "sql",
    sql: `SELECT * FROM Auth.UserPrompts WHERE 
    id = "ac93d8b5-a721-481e-a055-2f12def4a23a"`,
  });
  const { questionName, prompt, id } = codeSnippets && codeSnippets[0];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="bg-white">
        <Editor prompt={prompt} questionName={questionName} id={id} />
      </div>
    </div>
  );
}
