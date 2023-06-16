"use client"

// import SecondaryNavBar from "app/components/shared/SecondaryNavBar"
import SideBar from "app/components/shared/SideBar"

export default function Navigation({ mode }) {
  return (
    <>
      <SideBar mode={mode} />
    </>
  )
}

{
  /* {openSecondayNavBar && (
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
)} */
}
