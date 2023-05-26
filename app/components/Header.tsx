"use client"

import Link from "next/link"
import UserDropdown from "app/components/auth/UserDropdown"
import Image from "next/image"
import { usePathname } from "next/navigation"
import useWindowSize from "hooks/use-window-size"

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
                {!shouldHideLogo && pathname !== "/code-idea" && (
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
                  className={`sm:text-xl sm:text-xl mt-1 ml-2 bg-gradient-to-r
                    from-[#A1FFE0] to-[#2C9DC0] bg-clip-text font-sans text-3xl font-bold tracking-tight text-transparent  sm:leading-6`}
                >
                  Code Genius
                </h1>
              </div>
            </Link>
          </div>
          <div className="flex h-8">
            <div
              onClick={() => setShowSignInModal(true)}
              className={`my-auto mt-2 mr-4 flex w-32 cursor-pointer flex-row items-start justify-center rounded-lg sm:mr-16 ${
                !session
                  ? "bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0]"
                  : "bg-transparent"
              }  p-[1.5px] font-sans`}
            >
              {!session && (
                <div className={`relative h-9 w-32 rounded-lg bg-purple-900`}>
                  <p className="text-sm my-auto px-2 pt-1 text-center leading-7 text-white">
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
