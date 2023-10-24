"use client"

import Modal from "app/components/Modal"
import { useState } from "react"
import Link from "next/link"
import { paymentPortalLink } from "utils/helprs"
import { useRouter } from "next/navigation"

export default function ManageSubscription({ cancel, anual, translations }) {
  const [cancelModaIsOpen, setCancelModaIsOpen] = useState(false)
  const router = useRouter()
  const handleSubmit = async () => {
    // await cancelAction(subId, userId)
    router.push("/dashboard?action=subscription-deleted")
  }

  return (
    <>
      <div className="mt-6 flex justify-end space-x-4">
        <Modal
          isCreditsModal
          title={translations?.sure}
          body={translations?.loose}
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
          {cancel}
        </button>
        <Link
          href={paymentPortalLink}
          className="text-sm inline-flex h-10 items-center justify-center rounded-md bg-mint px-4 font-bold text-purple-500 hover:bg-mint/90"
        >
          {anual}
        </Link>
      </div>
    </>
  )
}
