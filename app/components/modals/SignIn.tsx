import { signIn } from "next-auth/react"
import { useState, Dispatch, SetStateAction, useEffect } from "react"
import Image from "next/image"
import BaseModal from "app/components/modals/BaseModal"
import GmailLogo from "public/icons/gmail.svg"
import useWindowSize from "hooks/use-window-size"
import Git from "../icons/git"
import { useSearchParams } from "next/navigation"

export const SignInModal = ({
  tip,
  userHasAccount,
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean
  userHasAccount?: boolean
  tip?: string
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
}) => {
  const searchParams = useSearchParams()
  const [signInClickedGitHub, setSignInClickedGitHub] = useState<boolean>(false)
  const [referer, setReferer] = useState<string>("/dashboard")
  const [signInClickedGoogle, setSignInClickedGoogle] = useState<boolean>(false)
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (searchParams && searchParams.get("referer")) {
      const referer = (searchParams.get("referer") as string) || "/code-idea"
      setReferer(referer)
    }
  }, [searchParams])

  return (
    <BaseModal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      {/* MAIN DIV - BACKGROUND*/}
      <div className="bg-purple-800 p-4 sm:h-auto sm:w-[504.01px] sm:rounded-2xl">
        {/* INNER DIV - FLEX CONTAINER */}
        {/* TITLE + SUBTITLE */}
        <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:p-12">
          <div className="mt-8 flex flex-col content-center justify-start justify-items-start gap-2 sm:mb-4 sm:mt-0">
            <h1
              className={`text-center font-sans text-[28px] font-[700] text-white`}
            >
              {userHasAccount
                ? "Access to your account"
                : "To create your account, sign up now"}
            </h1>
          </div>
          <h6 className="sm:text-xl mx-auto w-full text-center font-sans text-[16px] font-medium text-gray-200">
            Begin your coding journey with the assistance of Code Genius
          </h6>
          {tip && (
            <p className="text-md mx-auto w-full text-center font-sans text-gray-200">
              {tip}
            </p>
          )}
          {/* DIVIDER */}
          <hr className="border-1 border-purple-500 sm:w-[384.01px]" />
          {/* BUTTONS */}
          <div
            className={`flex ${
              isMobile ? "flex-row" : "flex-col"
            } mb-8 content-center justify-start justify-items-start gap-4`}
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
                  Loading...
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
            {/* GITHUB BUTTON */}
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
                <p className="text-[28px] font-[700] text-white">Loading...</p>
              ) : (
                <div className="mt-1 inline-flex content-center justify-center justify-items-center gap-2">
                  <Git />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}
