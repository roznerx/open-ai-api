"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import ContactFormModal from "./modals/ContactFormModal"

export default function Footer({
  session,
  translations,
}: {
  session: any
  translations: any
}) {
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)
  return (
    <>
      <ContactFormModal
        clientName={(session && session?.user && session?.user?.name) || ""}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <footer className="font-inter mx-auto flex w-[95vw] flex-col text-white">
        <div className="flex flex-col items-center justify-center py-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="justify-center">
            <Link href="/" className={`mt-7 flex sm:mx-0 sm:ml-2`}>
              <Image
                src={"/logo/code-genius.svg"}
                width={38}
                height={38}
                className={"-mr-1"}
                alt="Code Genius"
              />

              <h1
                className={`text-lg sm:text-xl sm:text-xl font-inter ml-3 
                 mt-2 bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0]
                 bg-clip-text text-2xl font-bold tracking-tight text-transparent max-md:pt-4 max-sm:pt-0 sm:leading-6`}
              >
                Code Genius
              </h1>
            </Link>
          </div>
          <div className="mt-8 flex sm:pt-2">
            <div
              onClick={() => setOpenContactForm(true)}
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              {translations?.contact}
            </div>
            <Link
              href="/pricing"
              prefetch={false}
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              {translations?.pricing}
            </Link>
            <Link
              href="https://discord.gg/3tbJD8vZQw"
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              Discord
            </Link>
            <Link
              href="/terms-and-conditions"
              prefetch={false}
              className="hidden cursor-pointer px-4 sm:block sm:px-2 sm:text-[16px]"
            >
              {translations?.terms}
            </Link>
            <Link
              href="/privacy"
              prefetch={false}
              className="hidden cursor-pointer px-4 sm:block sm:px-2 sm:text-[16px]"
            >
              {translations?.privacy}
            </Link>
          </div>
        </div>
        <div className="w-ful m-auto content-center border-t border-gray-400 py-4">
          <p className="w-[95vw] text-center">{translations?.copy}</p>
        </div>
      </footer>
    </>
  )
}
