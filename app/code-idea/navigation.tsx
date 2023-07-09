"use client"

import SideBar from "app/components/shared/SideBar"

export default function Navigation({
  mode,
  setGeneratedCode,
  translations,
  menuTranslations,
}) {
  return (
    <>
      <SideBar
        mode={mode}
        menuTranslations={menuTranslations}
        setGeneratedCode={setGeneratedCode}
        translations={translations}
      />
    </>
  )
}
