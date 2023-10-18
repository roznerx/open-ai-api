"use client"

import BaseModal from "app/components/modals/BaseModal"
import { Button } from "app/components/buttons/button"
import { X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import Image from "next/image"

export const ProModal = ({
  translations,
  showModal,
  setShowModal,
}: {
  translations: any
  setShowModal?: Dispatch<SetStateAction<boolean>>
  showModal: boolean
}) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <BaseModal showModal={showModal}>
      <div className="relative bg-purple-800 p-4 sm:h-auto sm:w-[504.01px] sm:rounded-2xl">
        <X
          onClick={() => {
            router.replace(pathname || "/")
            setShowModal && setShowModal(false)
          }}
          className="absolute right-3 top-3 cursor-pointer rounded-full border border-gray-200"
          size={20}
          color="white"
        />
        <div className="flex flex-col content-center justify-start justify-items-start gap-4 sm:px-12">
          <div className="mt-8 flex flex-col items-center justify-center sm:mt-0">
            <h1
              className={`mt-6 text-center font-sans text-[28px] font-[700] text-white`}
            >
              {translations?.title || "Upgrade to Pro"}
            </h1>
            <Image
              priority
              src="/icons/enterprice.svg"
              alt="Premium membership"
              width={40}
              height={40}
              className="mx-auto"
            />
          </div>
          <h6 className="sm:text-xl  mx-auto w-full text-center font-sans text-[16px] font-medium text-gray-200 ">
            {translations?.subtitle ||
              "By upgrading to a premium subscription you have access to the following features:"}
          </h6>
          <div className="my-4 columns-2 flex-col gap-8">
            <ul className="mx-auto space-y-4 text-center text-white">
              <li className="flex w-full min-w-[210px] space-x-3 ">
                {/* <!-- Icon --> */}
                <svg
                  className="text-xs mr-2 rounded-full bg-mint p-1 text-black"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {translations.pricing.premium.features.smart}
              </li>
              <li className="flex w-full min-w-[210px] space-x-3">
                <svg
                  className=" text-xs mr-2 rounded-full bg-mint p-1 text-black"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {translations.pricing.premium.features.test}
              </li>
              <li className="flex w-full min-w-[210px] space-x-3">
                <svg
                  className=" text-xs mr-2 rounded-full bg-mint p-1 text-black"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {translations.pricing.premium.features.improve}
              </li>
              <li className="flex w-full min-w-[210px] space-x-3">
                <svg
                  className=" text-xs mr-2 rounded-full bg-mint p-1 text-black"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {translations.pricing.premium.features.docs}
              </li>
              <li className="flex w-full min-w-[210px] space-x-3">
                <svg
                  className=" text-xs mr-2 rounded-full bg-mint p-1 text-black"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {translations.pricing.premium.features.chat}
              </li>
              <li className="flex w-full min-w-[210px] space-x-3">
                <svg
                  className=" text-xs mr-2 rounded-full bg-mint p-1 text-black"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Pro Support
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex">
          <Button
            onClick={() => router.push("/pricing")}
            className="mx-auto cursor-pointer border border-mint bg-transparent px-12 font-sans font-medium text-white outline-none hover:bg-mint/90 hover:font-semibold hover:text-purple-900 active:outline-none"
          >
            <span>Upgrade</span>
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
