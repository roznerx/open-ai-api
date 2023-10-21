"use client"

import Modal from "app/components/Modal"
import { useState } from "react"
import { cancelAction } from "./action"
import Link from "next/link"
import { paymentPortalLink } from "utils/helprs"

export default function ManageSubscription({ subId, userId }) {
  const [cancelModaIsOpen, setCancelModaIsOpen] = useState(false)

  const handleSubmit = () => {
    console.log("pasa por aqui")
    cancelAction(subId, userId)
  }

  return (
    <>
      <div className="mt-6 flex justify-end space-x-4">
        <Modal
          isCreditsModal
          title={"Are you sure you want to cancel?"}
          body={
            "If you cancel you will loose the avility to generate tests, code improvements and documentation."
          }
          isOpen={cancelModaIsOpen}
          onClickPrimary={handleSubmit}
          buttonText={"Cancel"}
          buttonLink={undefined}
          setIsOpen={setCancelModaIsOpen}
        />

        <button
          onClick={() => setCancelModaIsOpen(true)}
          className="text-sm inline-flex h-10 items-center justify-center rounded-md border border-gray-200 p-4 text-gray-200/90 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
        >
          Cancel Subscription
        </button>

        <Link
          href={paymentPortalLink}
          className="text-sm inline-flex h-10 items-center justify-center rounded-md bg-mint px-4 font-bold text-purple-500"
        >
          Switch to yearly
        </Link>
      </div>
    </>
  )
}
