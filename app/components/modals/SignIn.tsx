"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import BaseModal from "app/components/modals/BaseModal"
import GmailLogo from "public/icons/gmail.svg"
import useWindowSize from "hooks/use-window-size"
import Git from "../icons/git"
import Link from "next/link"
import { useSignInModal } from "./SignInModal"

export const SignInModal = ({
  tip,
  translations,
  userHasAccount,
  showSignInModal,
}: {
  showSignInModal: boolean
  translations: any
  userHasAccount?: boolean
  tip?: string
}) => {
  const [signInClickedGitHub, setSignInClickedGitHub] = useState<boolean>(false)
  const [referer, setReferer] = useState<string>("/dashboard")
  const [signInClickedGoogle, setSignInClickedGoogle] = useState<boolean>(false)
  const { isMobile } = useWindowSize()

  const { setShowSignInModal } = useSignInModal({
    userHasAccount,
    translations: translations?.modals?.signIn,
  })

  return (
    <BaseModal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="bg-purple-800 p-4 sm:h-auto sm:w-[504.01px] sm:rounded-2xl">
        <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:px-12">
          <div className="mt-8 flex flex-col items-center justify-center sm:mt-0">
            <h1
              className={`mt-6 text-center font-sans text-[28px] font-[700] text-white`}
            >
              {userHasAccount ? translations.title : translations.titleCreate}
            </h1>
          </div>
          <h6 className="sm:text-xl  mx-auto w-full text-center font-sans text-[16px] font-medium text-gray-200 ">
            {translations.subtitle}
          </h6>
          {tip && (
            <p className="text-md mx-auto -mt-3 w-full text-center font-sans text-gray-200">
              {tip}
            </p>
          )}

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
                signIn("google", { callbackUrl: referer })
              }}
            >
              {signInClickedGoogle ? (
                <p className="text-sm font-[700] text-gray-800 sm:text-[20px]">
                  {translations.loading}
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
                signIn("github", { callbackUrl: referer })
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
          {translations.byContinuing}{" "}
          <Link href="/terms" className="underline">
            {translations.privacy}
          </Link>{" "}
          {translations.acknowledge}{" "}
          <Link href="/terms-and-conditions" className="underline">
            {translations.terms}
          </Link>
        </p>
      </div>
    </BaseModal>
  )
}
