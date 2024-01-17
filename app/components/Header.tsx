"use client"

import Link from "next/link"
import UserDropdown from "app/components/auth/UserDropdown"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { useContext } from "react"
import { cn } from "@/lib/utils"
import { AuthContext } from "app/provider"

export default function Header({
  translations,
  session,
  userHasAccount = true,
}: {
  session?: any
  userHasAccount?: any
  translations?: any
}) {
  const pathName = usePathname()
  let { setModalIsOpen } = useContext(AuthContext) || {
    setModalIsOpen: () => {},
  }
  const canHideLogoInChat = pathName == "/code-chat" && session !== null
  return (
    <>
      <div
        id="site-header"
        className={`absolute left-0 top-0 z-20 w-full bg-transparent`}
      >
        <div className={`mt-2 flex w-full justify-between`}>
          <div
            className={`ml-4 mt-3 ${
              pathName == "/dashboard" ||
              pathName == "/code-idea" ||
              canHideLogoInChat ||
              pathName == "/settings"
                ? "hidden"
                : "sm:ml-6"
            }`}
          >
            <Link href="/">
              <div className={`flex`}>
                {/* <div className="mx-auto ml-1 h-8 w-8 rounded-full border border-black"> */}
                <Image
                  src={"/logo/code-genius.svg"}
                  width={32}
                  height={32}
                  alt="App Logo"
                />
                <h1
                  className={`sm:text-xl sm:text-xl ml-2  ${
                    pathName?.startsWith("/blog")
                      ? "bg-purple-900"
                      : "bg-gradient-to-r from-mint to-blue"
                  }
                    bg-clip-text font-sans text-2xl font-bold tracking-tight text-transparent sm:ml-2 sm:mt-1 sm:leading-6`}
                >
                  Code Genius
                </h1>
              </div>
            </Link>
          </div>
          <div className="mb-3 mr-1 flex h-6 pb-2 font-semibold sm:mt-1">
            {!session && (
              <>
                <Link href={"/pricing"}>
                  <p className="mr-3 mt-4 hidden cursor-pointer font-sans text-white sm:mr-6 sm:block ">
                    {translations?.menu?.pricing}
                  </p>
                </Link>
                <Link href={"/blog"}>
                  <p className="mr-3 mt-4 hidden cursor-pointer font-sans text-white sm:mr-6 sm:block ">
                    Blog
                  </p>
                </Link>
              </>
            )}
            <div
              onClick={() => setModalIsOpen(true)}
              className={cn(
                "my-auto mr-3 mt-2 flex w-auto cursor-pointer flex-row items-start justify-center rounded-lg bg-mint bg-transparent p-[1.5px] font-sans sm:mr-6",
              )}
            >
              {!session && (
                <div
                  className={cn(
                    "relative h-[37px] w-auto rounded-lg bg-mint px-2",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm my-auto px-2 pt-1 text-center leading-7 text-purple-900",
                    )}
                  >
                    {userHasAccount
                      ? translations?.login
                      : translations?.register}
                  </p>
                </div>
              )}
            </div>
          </div>
          <UserDropdown translations={translations} session={session} />
        </div>
      </div>
    </>
  )
}
