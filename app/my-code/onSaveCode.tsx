import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";

export default function SaveCode({ isSaving, id, questionName, setIsSaving }) {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;
  const activeCode = useActiveCode();
  const code = files[activeFile].code;

  console.log("🚀 - activeCode:", activeCode);
  console.log("🚀 - code:", code);

  useEffect(() => {
    if (code && isSaving) {
      console.log("all good");
      const payload = {
        id,
        questionName,
        prompt: code,
      };
      console.log("payload", payload);
      fetch("/api/prompt/update", {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => console.log("res:", res))
        .finally(() => setIsSaving(false));
    }
  }, [isSaving, code]);
  if (isSaving) {
    return <p>"Saving.."</p>;
  }
}
