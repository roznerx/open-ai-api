"use client"

import SideBar from "app/components/shared/SideBar"

export default function Navigation({ mode, setGeneratedCode }) {
  return (
    <>
      <SideBar mode={mode} setGeneratedCode={setGeneratedCode} />
    </>
  )
}
