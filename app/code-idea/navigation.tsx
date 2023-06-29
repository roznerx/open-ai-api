"use client"

import SideBar from "app/components/shared/SideBar"

export default function Navigation({ mode, setGeneratedCode, translations }) {
  return (
    <>
      <SideBar
        mode={mode}
        setGeneratedCode={setGeneratedCode}
        translations={translations}
      />
    </>
  )
}
