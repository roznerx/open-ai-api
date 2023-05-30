"use client"

import SecondaryNavBar from "app/components/shared/SecondaryNavBar"
import SideBar from "app/components/shared/SideBar"

export default function Navigation({
  mode,
  setGeneratedCode,
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
