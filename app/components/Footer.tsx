"use client"

import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const ContactFormModal = dynamic(() => import("./modals/ContactFormModal"), {
  loading: () => (
    <Loader2 size={20} color="white" className="h-8 w-8 animate-spin" />
  ),
})

export default function Footer({ session }: { session: any }) {
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)
  return (
    <>
      <ContactFormModal
        clientName={(session && session?.user && session?.user?.name) || ""}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <footer className="mx-auto flex w-[80vw] flex-col font-sans text-white">
        <div className="w-ful flex flex-col items-center justify-center py-4 sm:flex-row sm:items-start sm:justify-between">
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
                className={`text-lg sm:text-xl sm:text-xl ml-3 mt-2 
                 bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text
                 font-sans text-2xl font-bold tracking-tight text-transparent max-md:pt-4 max-sm:pt-0 sm:leading-6`}
              >
                Code Genius
              </h1>
            </Link>
          </div>
          <div className="mt-8 flex sm:pt-2">
            <Link
              href="/pricing"
              prefetch={false}
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              Pricing
            </Link>
            <div
              onClick={() => setOpenContactForm(true)}
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              Contact
            </div>
            <Link
              href="https://discord.gg/3tbJD8vZQw"
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              Discord
            </Link>
            <Link
              href="/terms-and-conditions"
              prefetch={false}
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              prefetch={false}
              className="cursor-pointer px-4 sm:px-2 sm:text-[16px]"
            >
              Privacy
            </Link>
          </div>
        </div>
        <div className="w-ful m-auto content-center border-t border-gray-400 py-4">
          <p className="w-[80vw] text-center">
            © Copyright 2023. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
