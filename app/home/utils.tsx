import React from "react"
import Lottie from "lottie-react"

import Suggestions from "../../animations/smartImprovements.json"
import TestGeneration from "../../animations/generating-tests.json"
import codeDocumentation from "../../animations/codeDocumentation.json"

const interactivity: any = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.2],
      type: "stop",
      frames: [0],
    },
    {
      visibility: [0.2, 0.5],
      type: "seek",
      frames: [0, 135],
    },
    {
      visibility: [0.5, 0.9],
      type: "stop",
      frames: [150],
    },
  ],
}

export const AISuggestions = React.memo(() => {
  return (
    <>
      <Lottie interactivity={interactivity} animationData={Suggestions} />
    </>
  )
})
export const AIGeneration = React.memo(() => {
  return <Lottie interactivity={interactivity} animationData={TestGeneration} />
})

export const CodeDocumentation = React.memo(() => {
  return (
    <Lottie interactivity={interactivity} animationData={codeDocumentation} />
  )
})
