"use client"

import Link from "next/link"
import UserDropdown from "app/components/auth/UserDropdown"
import Image from "next/image"
import { usePathname } from "next/navigation"
import useWindowSize from "hooks/use-window-size"
import Feedback from "./Feedback"
import { useState } from "react"

export default function Header({
  session,
  userHasAccount,
  setShowSignInModal,
}: {
  session?: any
  showSignInModal?: any
  userHasAccount?: any
  setShowSignInModal: any
}) {
  const pathname = usePathname()
  const [showWidget, setShowWidget] = useState(false)
  const { isMobile } = useWindowSize()
  const shouldHideLogo =
    isMobile &&
    (pathname == "/code-idea" ||
      pathname === "/code-chat" ||
      pathname === "/dashboard")
  return (
    <>
      <div id="site-header" className={`absolute top-0 w-full`}>
        <div className="flex items-center justify-between">
          <div
            className={` ${
              pathname === "/pricing" ? "ml-4" : "ml-4"
            } mt-4 sm:ml-14`}
          >
            <Link href="/" className={` flex sm:mx-0`}>
              <div className={`mt-1 flex sm:ml-7`}>
                {!shouldHideLogo && (
                  <>
                    <Image
                      src={"/logo/code-genius.svg"}
                      width={32}
                      height={32}
                      className={"right-8"}
                      alt="Code Genius"
                    />
                  </>
                )}
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
          <div className="flex h-8 gap-4">
            {session && pathname !== "/" && (
              <div className="mr-5 hidden flex-col items-end transition-all sm:flex">
                <button
                  onClick={() => setShowWidget((prev) => !prev)}
                  className="mt-2 mr-3 flex h-6 w-28 items-center justify-center rounded-lg border border-gray-300 bg-purple-900 p-5 text-gray-200 hover:cursor-pointer hover:text-gray-50"
                >
                  <span>Feedback</span>
                </button>
                <Feedback
                  session={session}
                  setShowWidget={setShowWidget}
                  showWidget={showWidget}
                />
              </div>
            )}
            <div
              onClick={() => setShowSignInModal(true)}
              className={`my-auto mt-2 mr-4 flex w-36 cursor-pointer flex-row items-start justify-center rounded-lg sm:mr-16 ${
                !session ? "border border-mint" : "bg-transparent"
              }  p-[1.5px] font-sans`}
            >
              {!session && (
                <div className={`relative h-[37px] w-36 rounded-lg`}>
                  <p className="text-sm my-auto px-2 pt-1 text-center leading-7 text-gray-200 hover:text-gray-50">
                    {!userHasAccount ? "Sign In" : "Sign Up"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <UserDropdown session={session} />
        </div>
      </div>
    </>
  )
}
