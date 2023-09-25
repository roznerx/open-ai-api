"use client"

import ContactFormModal from "app/components/modals/ContactFormModal"
import PaymentModal from "app/components/modals/PaymentModal"
import React, { useEffect } from "react"
import tailwindConfig from "tailwind.config"
import { SUBSCRIPTION_PRICES } from "@/lib/constants"
import Header from "app/components/Header"
import Faqs from "./faqs"
import { useSignInModal } from "app/components/modals/SignInModal"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

//Theme colors
const colors: any = tailwindConfig.theme?.extend?.colors

type ClientPropTye = {
  session: any
  translations: any
  userHasAccount: any
}

export default function Client({
  session,
  translations,
  userHasAccount,
}: ClientPropTye) {
  const { setShowSignInModal, SignInModal } = useSignInModal({
    translations: translations?.modals?.signIn,
  })
  const [loadingStripe, setLoadingStripe] = React.useState<boolean>(false)
  const router = useRouter()
  const [priceId, setPrecieId] = React.useState<string>("")
  const [openPayment, setOpenPayment] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

  useEffect(() => {
    setPrecieId(SUBSCRIPTION_PRICES.premium)
  }, [])

  const submitPaymentInstruction = async (e) => {
    e.preventDefault()
    setLoadingStripe(true)

    if (!session) {
      setShowSignInModal(true)
      return false
    }
    const response = await fetch("/api/checkout/stripe_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceUID: priceId,
        userId: session?.user?.id,
      }),
    })

    const stripeSession = await response.json()

    // setLoadingStripe(false)

    if (stripeSession) {
      router.push(stripeSession?.session?.url)
    }
  }

  return (
    <>
      <SignInModal />
      <Header
        userHasAccount={userHasAccount}
        translations={translations.home.header}
        session={session}
        setShowSignInModal={setShowSignInModal}
      />
      <PaymentModal isOpen={openPayment} setIsOpen={setOpenPayment} />
      <ContactFormModal
        clientName={session && session?.user && session?.user?.name}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <div className=" mx-auto my-6 px-4 pt-20">
        <h2 className="mx-auto mb-3 w-[80%] text-4xl font-semibold text-white dark:text-white sm:w-[100%] sm:text-6xl sm:leading-none sm:tracking-tight">
          {translations.pricing.title}
        </h2>
        <p className="mx-auto mt-8 w-[80%] text-gray-300 sm:w-full">
          {translations.pricing.subtitle1}{" "}
          <span className="font-medium text-gray-200">
            {" "}
            {translations.pricing.subtitle2}
          </span>
        </p>
        <section className="flex w-full items-center justify-center py-12">
          <div className="container px-4 md:px-6">
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <div className=" my-4 flex  flex-col justify-between rounded-lg bg-purple-500 p-6 shadow-lg">
                <div>
                  <Image
                    src="/icons/premium.svg"
                    alt="Premium membership"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <h3 className="text-center text-2xl font-bold text-white">
                    Basic
                  </h3>
                  <div className="mt-4 text-center text-white">
                    <span className="text-4xl font-bold">Free</span>
                  </div>
                  <ul className="mx-20 mt-4 space-y-2 text-white sm:mx-8 md:mx-8">
                    <li className="flex items-center">
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
                      720p Video Rendering
                    </li>
                    <li className="flex items-center">
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
                      2GB Cloud Storage
                    </li>
                    <li className="flex items-center">
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
                      Basic Video Templates
                    </li>
                    <li className="flex items-center">
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
                      Basic Support
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-mint to-blue">
                    Current Plan
                  </Button>
                </div>
              </div>
              <div className="relative flex flex-col justify-between rounded-lg border border-mint bg-purple-500 p-6  shadow-lg">
                <Image
                  src="/icons/enterprice.svg"
                  alt="Enterprise"
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <div className="text-sm absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-mint px-3 py-1 font-bold text-purple-700 ">
                  Popular
                </div>
                <div>
                  <h3 className="absolute left-1/2 top-20 inline-block -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                    Pro
                  </h3>
                  <div className="mt-4 text-center text-white ">
                    <span className="text-4xl font-bold text-white">$5</span>/
                    month
                  </div>
                  <ul className=" mx-20 mt-4 space-y-2 text-white sm:mx-8 md:mx-8">
                    <li className="flex w-full space-x-3 self-center">
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
                      <span>{translations.pricing.premium.features.smart}</span>
                    </li>
                    <li className="flex w-full space-x-3">
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
                      <span> {translations.pricing.premium.features.test}</span>
                    </li>
                    <li className="flex w-full space-x-3">
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
                      <span>
                        {" "}
                        {translations.pricing.premium.features.improve}
                      </span>
                    </li>
                    <li className="flex w-full space-x-3">
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
                      <span> {translations.pricing.premium.features.docs}</span>
                    </li>
                    <li className="flex w-full space-x-3">
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
                      <span> {translations.pricing.premium.features.chat}</span>
                    </li>
                    <li className="flex w-full space-x-3">
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
                      <span>Pro Support</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={submitPaymentInstruction}
                    className="w-full border-none bg-gradient-to-r from-mint to-blue outline-none active:outline-none"
                  >
                    Go Pro
                  </Button>
                </div>
              </div>
              <div className="my-4 flex flex-col justify-between rounded-lg bg-purple-500 p-6 shadow-lg">
                <div className="text-white">
                  <Image
                    src="/icons/enterprice.svg"
                    alt="Enterprise"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <h3 className="text-center text-2xl font-bold">Enterprise</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                  <ul className="mx-20 mt-4 space-y-2 sm:mx-8 md:mx-8">
                    <li className="flex items-center">
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

                      {translations.pricing.enterprice.features["1"]}
                    </li>
                    <li className="flex items-center">
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
                      {translations.pricing.enterprice.features["2"]}
                    </li>
                    <li className="flex items-center">
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
                      {translations.pricing.enterprice.features["3"]}
                    </li>
                    <li className="flex items-center">
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
                      {translations.pricing.enterprice.features["4"]}
                    </li>
                    <li className="flex items-center">
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
                      Enterprise Support
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-mint to-blue">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-10 w-full">
        <Faqs translations={translations.pricing.faqs} />
      </div>
    </>
  )
}
