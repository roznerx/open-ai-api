"use client";

import { harperClient } from "@/lib/harperdb";
import {
  Sandpack,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

import SaveCode from "./onSaveCode";

type CustomElement = {
  style?: {
    display: string;
  };
};

export default function Editor({ questionName, prompt, id }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isReseting, setIsReseting] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const openInSandBoxNode = document.querySelector(
        '[title="Open in CodeSandbox"]',
      ) as CustomElement;

      if (openInSandBoxNode) {
        openInSandBoxNode.style.display = "none";
      }
    }
  }, []);

  return (
    <>
      <div>
        <h3> Question Name: {questionName}</h3>
        {prompt.length > 0 && (
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
            <SandpackLayout>
              <SandpackCodeEditor showTabs showLineNumbers={true} />
              <SandpackPreview
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
              {(isSaving || isReseting) && (
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
  );
}
