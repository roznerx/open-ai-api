"use client"

import { signIn } from "next-auth/react"
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from "react"
import Image from "next/image"
import BaseModal from "app/components/modals/BaseModal"
import { Poppins } from "next/font/google"
import GithubLogo from 'public/icons/github.svg';
import GmailLogo from 'public/icons/gmail.svg';

const popins = Poppins({
  variable: "--font-popins",
  weight: ["100", "300", "600"],
});

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
}) => {
  //const [signInClicked, setSignInClicked] = useState(false)
  // Hotfix for the sign in states!
  const [signInClickedGitHub, setSignInClickedGitHub] = useState<boolean>(false);
  const [signInClickedGoogle, setSignInClickedGoogle] = useState<boolean>(false);

  return (
    <BaseModal showModal={/*showSignInModal*/true} setShowModal={setShowSignInModal}>
      {/* MAIN DIV - BACKGROUND*/}
      <div className="rounded-2xl h-[487px] w-[504.01px] bg-purple-700 p-4">
        {/* INNER DIV - FLEX CONTAINER */}
        { /* TITLE + SUBTITLE */ }
        <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:p-12">
          <div className="flex flex-col content-center justify-start justify-items-start gap-4 mb-8">
            <h1 className={`${popins.variable} text-center text-[28px] font-[700] leading-6 text-white sm:text-left`}>
              Create your Account
            </h1>
            <h6 className="text-[20px] font-[400] font-mono leading-10 text-gray-200">
              Start coding with Code Genius
            </h6>
          </div>
          {/* DIVIDER */}
          <hr className="border-1 border-purple-500 w-[384.01px]" />
          <div className="flex flex-col content-center justify-start justify-items-start gap-4 mb-8">
            {/* GITHUB BUTTON */}
          <button
            disabled={signInClickedGitHub}
            className={"h-[80px] w-[380px] bg-black rounded-lg"}
            onClick={() => {
              setSignInClickedGitHub(true)
              signIn("github", {
                callbackUrl: process.env.NEXTAUTH_URL,
              })
            }}
          >
            {
              signInClickedGitHub ? 
              <p className="text-white text-[28px] font-[700]">Loading...</p> : 
              <div className="flex inline-flex content-center justify-center justify-items-center gap-2">
                <Image
                  width={32}
                  height={32}
                  alt="Github Logo"
                  src={GithubLogo.src}
                  className="h-[25.51px] w-[26.15px] flex self-center"
                />
                <p className="text-white text-[28px] font-[700]">GitHub</p>
              </div>
            }
          </button>
          {/* GOOGLE BUTTON */}
          <button
            disabled={signInClickedGoogle}
            className={"h-[80px] w-[380px] bg-white rounded-lg"}
            onClick={() => {
              setSignInClickedGoogle(true)
              signIn("google", {
                callbackUrl: process.env.NEXTAUTH_URL,
              })
            }}
          >
            {
              signInClickedGoogle ? 
              <p className="text-gray-800 text-[28px] font-[700]">Loading...</p> : 
              <div className="flex inline-flex content-center justify-center justify-items-center gap-2">
                <Image
                  width={32}
                  height={32}
                  alt="Gmail Logo"
                  src={GmailLogo.src}
                  className="h-[38px] w-[38x] flex self-center"
                />
                <p className="text-gray-800 text-[28px] font-[700]">Gmail</p>
              </div>
            }
          </button>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false)

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    )
  }, [showSignInModal, setShowSignInModal])

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  )
}
