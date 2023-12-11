"use client"

import { signIn } from "next-auth/react"
import { useContext, useState } from "react"
import Image from "next/image"
import BaseModal from "app/components/modals/BaseModal"
import GmailLogo from "public/icons/gmail.svg"
import useWindowSize from "hooks/use-window-size"
import Git from "../icons/git"
import Link from "next/link"
import { X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { AuthContext } from "app/provider"

export const SignInModal = ({
  signInTranslations,
}: {
  signInTranslations: any
}) => {
  let { isOpen, setModalIsOpen } = useContext(AuthContext) || {
    isOpen: false,
    setModalIsOpen: () => {},
  }
  const [signInClickedGitHub, setSignInClickedGitHub] = useState<boolean>(false)
  const [signInClickedGoogle, setSignInClickedGoogle] = useState<boolean>(false)
  const { isMobile } = useWindowSize()
  const router = useRouter()
  const pathname = usePathname()
  console.log("pathname:", pathname)

  return (
    <BaseModal showModal={isOpen} setShowModal={setModalIsOpen}>
      <div className="relative bg-purple-800 p-4 sm:h-auto sm:w-[504.01px] sm:rounded-2xl">
        <X
          onClick={() => {
            setModalIsOpen(false)
            router.replace(pathname || "/")
          }}
          className="absolute right-3 top-3 cursor-pointer "
          size={20}
          color="white"
        />
        <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:px-12">
          <div className="mt-8 flex flex-col items-center justify-center sm:mt-0">
            <h1
              className={`mt-6 text-center font-sans text-[28px] font-[700] text-white`}
            >
              {signInTranslations.titleCreate}
            </h1>
          </div>
          <h6 className="sm:text-xl  mx-auto w-full text-center font-sans text-[16px] font-medium text-gray-200 ">
            {signInTranslations.subtitle}
          </h6>
          {/* {tip && (
            <p className="text-md mx-auto -mt-3 w-full text-center font-sans text-gray-200">
              {tip}
            </p>
          )} */}

          <hr className="border-1 border-purple-500 sm:w-[384.01px]" />

          <div
            className={`flex ${
              isMobile ? "flex-row" : "flex-col"
            } mb-2 content-center justify-start justify-items-start gap-4`}
          >
            {/* GOOGLE BUTTON */}
            <button
              disabled={signInClickedGoogle}
              className={
                "h-[45px] w-full rounded-lg border border-black bg-white sm:h-[60px] sm:w-[380px]"
              }
              onClick={() => {
                setSignInClickedGoogle(true)
                signIn("google", {
                  callbackUrl:
                    pathname === "/" ? "/dashboard" : pathname || "/dashboard",
                })
              }}
            >
              {signInClickedGoogle ? (
                <p className="text-sm font-[700] text-gray-800 sm:text-[20px]">
                  {signInTranslations.loading}
                </p>
              ) : (
                <div className="mt-1 inline-flex content-center justify-center justify-items-center gap-2 ">
                  <Image
                    height={111}
                    width={111}
                    alt="Google Login"
                    src={GmailLogo}
                    className="flex self-center"
                  />
                </div>
              )}
            </button>
            <button
              disabled={signInClickedGitHub}
              className={
                "h-[45px] w-full rounded-lg border border-white bg-black sm:h-[60px] sm:w-[380px]"
              }
              onClick={() => {
                setSignInClickedGitHub(true)
                signIn("github", { callbackUrl: "/dashboard" })
              }}
            >
              {signInClickedGitHub ? (
                <p className="font-[700] text-white sm:text-[20px]">
                  Loading...
                </p>
              ) : (
                <div className="mt-1 inline-flex content-center justify-center justify-items-center gap-2">
                  <Git />
                </div>
              )}
            </button>
          </div>
        </div>
        <p className=" mx-auto w-[80%] py-6 text-center text-[14px] text-gray-400">
          {signInTranslations.byContinuing}{" "}
          <Link href="/terms" className="underline">
            {signInTranslations.privacy}
          </Link>{" "}
          {signInTranslations.acknowledge}{" "}
          <Link href="/terms-and-conditions" className="underline">
            {signInTranslations.terms}
          </Link>
        </p>
      </div>
    </BaseModal>
  )
}
