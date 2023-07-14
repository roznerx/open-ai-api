"use client"

import ErrorLog from "app/error"

export default function Error({ error, reset }) {
  return <ErrorLog error={error} reset={reset} />
}
