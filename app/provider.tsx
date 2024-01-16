"use client"

import { SessionProvider } from "next-auth/react"

import React, { useState } from "react"
type AuthType = {
  isOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = React.createContext<AuthType | null>(null)

export default function Provider({ children }) {
  const [isOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <SessionProvider>
        <AuthContext.Provider value={{ isOpen, setModalIsOpen }}>
          {children}
        </AuthContext.Provider>
      </SessionProvider>
    </>
  )
}
