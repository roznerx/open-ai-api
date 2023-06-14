"use client"

import SecondaryNavBar from "app/components/shared/SecondaryNavBar"
import SideBar from "app/components/shared/SideBar"
import { useEffect } from "react"

export default function Navigation({
  mode,
  setGeneratedCode,
  setCodeSentence,
  smartSelected,
  setMode,
  setOpenSecondaryNavBar,
  openSecondayNavBar,
  improveSelected,
  setImproveSelected,
  testSelected,
  setTestSelected,
  docSelected,
  setDocSelected,
  setSmartSelected,
}) {
  const isCodeModeSelected =
    smartSelected | improveSelected | testSelected | docSelected

  useEffect(() => {
    setGeneratedCode("")
    setCodeSentence("")
  }, [mode, setCodeSentence, setGeneratedCode])

  return (
    <>
      <SideBar
        setMode={setMode}
        mode={mode}
        setSmartSelected={setSmartSelected}
        setImproveSelected={setImproveSelected}
        setDocSelected={setDocSelected}
        setTestSelected={setTestSelected}
        setOpenSecondaryNavBar={setOpenSecondaryNavBar}
      />
      {openSecondayNavBar && (
        <SecondaryNavBar
          mode={mode}
          setGeneratedCode={setGeneratedCode}
          setOpenSecondayNavBar={setOpenSecondaryNavBar}
          isCodeModeSelected={isCodeModeSelected}
          openSecondayNavBar={openSecondayNavBar}
          improveSelected={improveSelected}
          setImproveSelected={setImproveSelected}
          smartSelected={smartSelected}
          setSmartSelected={setSmartSelected}
          testSelected={testSelected}
          setTestSelected={setTestSelected}
          docSelected={docSelected}
          setDocSelected={setDocSelected}
        />
      )}
    </>
  )
}
