"use client"

import PaymentModal from "app/components/modals/PaymentModal"
import { useState } from "react"

export default function Demo() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <PaymentModal isOpen={open} setIsOpen={setOpen} />
      <div className="mx-auto flex items-center">
        <button
          className={`
                        text-sm inline-flex min-w-[145px] justify-center rounded-md 
                        border border-transparent bg-blue-100 px-4 py-2 font-medium 
                        text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2 
                        `}
          onClick={() => setOpen(true)}
        >
          HIT ME
        </button>
      </div>
    </>
  )
}
