"use client"

import {
  SandpackPreview,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackConsole,
  SandpackProvider,
} from "@codesandbox/sandpack-react"
import useWindowSize from "hooks/use-window-size"

import { useState } from "react"

import SaveCode from "./onSaveCode"

export default function Editor({ questionName, prompt, id }) {
  const [isSaving, setIsSaving] = useState(false)
  const [isReseting, setIsReseting] = useState(false)
  const { isMobile } = useWindowSize()

  return (
    <>
      <div>
        <h3 className="my-3 ml-2 font-popins text-gray-200">
          {" "}
          Question Name: <span className="italic">{questionName}</span>
        </h3>
        {prompt && prompt.length > 0 && (
          <SandpackProvider
            options={{
              visibleFiles: ["/App.tsx"],
              activeFile: "/App.tsx",
            }}
            theme="dark"
            // Try out the included templates below!
            template="react-ts"
            files={{
              "/App.tsx": prompt,
            }}
          >
            <SandpackLayout className="h-full">
              <SandpackCodeEditor
                style={{ height: isMobile ? 300 : 600 }}
                showTabs
                showLineNumbers={true}
              />
              <SandpackPreview
                style={{ height: isMobile ? 300 : 600 }}
                actionsChildren={
                  <>
                    <button
                      className="rounded-full bg-black px-2 text-gray-200"
                      onClick={() => setIsSaving(true)}
                    >
                      Save
                    </button>
                    <button
                      className="rounded-full bg-black px-2 text-gray-200"
                      onClick={() => setIsReseting(true)}
                    >
                      Reset
                    </button>
                  </>
                }
              />

              {isSaving && (
                <SaveCode
                  setIsReseting={setIsReseting}
                  isReseting={isReseting}
                  setIsSaving={setIsSaving}
                  isSaving={isSaving}
                  questionName={questionName}
                  id={id}
                />
              )}
            </SandpackLayout>
          </SandpackProvider>
        )}
      </div>
    </>
  )
}
