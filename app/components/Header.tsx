"use client"

import Link from "next/link"
import UserDropdown from "app/components/auth/UserDropdown"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { useState } from "react"
import Feedback from "./Feedback"

export default function Header({
  translations,
  session,
  userHasAccount,
  setShowSignInModal,
}: {
  session?: any
  showSignInModal?: any
  userHasAccount?: any
  translations?: any
  setShowSignInModal: any
}) {
  const pathname = usePathname()
  const [showWidget, setShowWidget] = useState(false)

  return (
    <>
      <div
        id="site-header"
        className={`absolute left-0 top-0 z-20 w-full bg-transparent`}
      >
        <div className="flex items-center justify-between">
          <div className={`ml-4 mt-4 sm:ml-14`}>
            <Link href="/" className={` flex sm:mx-0`}>
              <div className={`mt-1 flex sm:ml-7`}>
                <>
                  <Image
                    src={"/logo/code-genius.svg"}
                    width={32}
                    height={32}
                    className={"right-8 hidden sm:block"}
                    alt="Code Genius"
                  />
                </>
                <h1
                  className={`sm:text-xl ${
                    pathname === "/" ? "ml-3" : "ml-12"
                  } sm:text-xl mt-1  bg-gradient-to-r from-[#A1FFE0]
                    to-[#2C9DC0] bg-clip-text font-sans text-3xl font-bold tracking-tight text-transparent sm:ml-2 sm:leading-6`}
                >
                  Code Genius
                </h1>
              </div>
            </Link>
          </div>
          <div className="flex h-8 ">
            <div
              onClick={() => setShowSignInModal(true)}
              className={`my-auto mt-2 mr-4 flex ${
                !session ? "w-32" : "w-12"
              } cursor-pointer flex-row items-start justify-center rounded-lg sm:mr-16 ${
                !session ? "border border-mint" : "bg-transparent"
              }  p-[1.5px] font-sans`}
            >
              {!session && (
                <div
                  className={`relative h-[37px] w-32 rounded-lg bg-purple-700`}
                >
                  <p className="text-sm my-auto px-2 pt-1 text-center leading-7 text-gray-50 ">
                    {userHasAccount
                      ? translations?.login
                      : translations?.register}
                  </p>
                </div>
              )}
            </div>
            {session && pathname !== "/" && (
              <div className="mr-24 hidden flex-col items-end transition-all sm:flex ">
                <button
                  onClick={() => setShowWidget((prev) => !prev)}
                  className="mt-3.5 mr-3 flex h-4 w-28 items-center justify-center rounded-lg border
                   border-gray-300 bg-purple-900 p-4 text-gray-200 hover:cursor-pointer hover:text-gray-50"
                >
                  <span>{translations?.feedback?.title}</span>
                </button>
                <Feedback
                  translations={translations?.feedback}
                  session={session}
                  setShowWidget={setShowWidget}
                  showWidget={showWidget}
                />
              </div>
            )}
          </div>
          <UserDropdown translations={translations} session={session} />
        </div>
      </div>
    </>
  )
}
