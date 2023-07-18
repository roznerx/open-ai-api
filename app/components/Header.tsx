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
  const shouldJustifyBetween =
    pathname == "/" ||
    pathname == "/pricing" ||
    pathname == "/terms-and-conditions" ||
    pathname == "/privacy"
  const [showWidget, setShowWidget] = useState(false)

  return (
    <>
      <div
        id="site-header"
        className={`absolute left-0 top-0 z-20 w-full bg-transparent`}
      >
        <div
          className={`mt-5 flex w-full items-center ${
            shouldJustifyBetween && !session
              ? "justify-between"
              : "justify-center"
          } sm:items-start sm:justify-between`}
        >
          <div
            className={`${
              pathname !== "/" && pathname !== "/pricing"
                ? "sm:ml-20"
                : "sm:ml-6"
            } ml-4 pt-2`}
          >
            <Link href="/">
              <div className={`flex`}>
                <Image
                  src={"/logo/code-genius.svg"}
                  width={32}
                  height={32}
                  className={`mt-1`}
                  alt="Code Genius"
                />
                <h1
                  className={`sm:text-xl sm:text-xl ml-2 mt-1 bg-gradient-to-tl from-[#A1FFE0] to-[#2C9DC0]
                    bg-clip-text font-sans text-3xl font-bold tracking-tight text-transparent sm:ml-2 sm:mt-2 sm:leading-6`}
                >
                  Code Genius
                </h1>
              </div>
            </Link>
          </div>
          <div className="mb-3 mr-1 flex h-8 pb-2 sm:mt-0">
            {!session && (
              <Link href={"/pricing"}>
                <p className="mr-3 mt-4 hidden cursor-pointer font-sans text-white sm:mr-6 sm:block ">
                  {translations?.menu?.pricing}
                </p>
              </Link>
            )}
            <div
              onClick={() => setShowSignInModal(true)}
              className={`my-auto mr-3 mt-2 flex w-auto cursor-pointer flex-row items-start justify-center rounded-lg sm:mr-6 ${
                !session ? "border border-mint" : "bg-transparent"
              }  p-[1.5px] font-sans`}
            >
              {!session && (
                <div
                  className={`relative h-[37px] w-auto rounded-lg bg-purple-700 px-2`}
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
                  className="mr-3 mt-1 flex h-4 w-28 items-center justify-center rounded-lg border
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
