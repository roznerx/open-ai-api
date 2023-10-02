"use client"

import ContactFormModal from "app/components/modals/ContactFormModal"
import PaymentModal from "app/components/modals/PaymentModal"
import React, { useEffect } from "react"
import { SUBSCRIPTION_PRICES } from "@/lib/constants"
import Header from "app/components/Header"
import Faqs from "./faqs"
import { useSignInModal } from "app/components/modals/SignInModal"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

//Theme colors
// const colors: any = tailwindConfig.theme?.extend?.colors

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
        <h2 className="mx-auto  mb-3 w-[80%] bg-gradient-to-tl from-mint to-blue bg-clip-text text-4xl font-semibold text-transparent sm:w-[100%] sm:text-6xl sm:leading-none sm:tracking-tight">
          {translations.pricing.title}
        </h2>
        <p className="mx-auto mt-8 w-[80%] text-2xl text-gray-100 sm:w-full">
          {translations.pricing.subtitle1}
        </p>
        <section className="flex w-full items-center justify-center py-12">
          <div className="container px-4 md:px-6">
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <div className="my-4 flex flex-col justify-between rounded-lg border border-blue/50 bg-purple-500 p-12 shadow-lg  ">
                <div>
                  <Image
                    src="/icons/premium.svg"
                    alt="Premium membership"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <h3 className="text-center text-2xl font-bold text-white">
                    {translations.pricing.basic.title}
                  </h3>
                  <div className="mt-4 text-center text-white">
                    <span className="text-3xl font-bold">
                      {translations.pricing.basic.subtitle}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-4 text-left text-white sm:mx-8 md:mx-8">
                    <li className="flex w-full min-w-[210px] space-x-3">
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
                      {translations.pricing.basic.features["smart"]}
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
                      {translations.pricing.basic.features["chat"]}
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
                      {translations.pricing.basic.features["support"]}
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
                      {translations.pricing.basic.features["copy"]}
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div
                    className={`mx-auto my-4 mt-2 flex w-[250px] cursor-pointer flex-row items-center justify-center 
      rounded-lg bg-gradient-to-r from-mint to-mint p-[1px] 
    sm:items-start sm:justify-center`}
                  >
                    <div className="relative h-[38px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-500">
                      <button
                        type="submit"
                        className="text-sm px-1 py-2 text-center font-sans text-white sm:mx-auto "
                      >
                        Current Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col justify-between rounded-lg border border-mint bg-purple-500  p-12 shadow-lg shadow-blue/50">
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
                <div className="relative">
                  <h3 className="inline-block  text-2xl font-bold text-white">
                    Pro
                  </h3>
                  <div className="mt-4 text-center text-white ">
                    <span className="text-4xl font-bold text-white">$5</span> /
                    month
                  </div>
                  <ul className="mt-4 space-y-4 text-left text-white sm:mx-8 md:mx-8">
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
                <div className="mt-6">
                  <Button
                    onClick={submitPaymentInstruction}
                    className="w-full border-none bg-mint font-sans font-medium text-black outline-none hover:bg-mint/80 active:outline-none"
                  >
                    Go Pro
                  </Button>
                </div>
              </div>
              <div className="my-4 flex flex-col justify-between rounded-lg border border-blue/50 bg-purple-500 p-12 shadow-lg ">
                <div className="text-white">
                  <Image
                    src="/icons/enterprice.svg"
                    alt="Enterprise"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <h3 className="text-center text-2xl font-bold">Enterprise</h3>
                  <ul className="mt-12 space-y-4 text-left md:mx-8">
                    <li className="flex w-full min-w-[210px] space-x-3">
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

                      {translations.pricing.enterprice.features["1"]}
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
                      {translations.pricing.enterprice.features["2"]}
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
                      {translations.pricing.enterprice.features["3"]}
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
                      {translations.pricing.enterprice.features["4"]}
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
                      Enterprise Support
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div
                    onClick={() => setOpenContactForm(true)}
                    className={`mx-auto my-4 mt-2 flex w-[250px] cursor-pointer flex-row items-center justify-center 
      rounded-lg bg-gradient-to-r from-mint to-mint p-[1px] 
    sm:items-start sm:justify-center`}
                  >
                    <div className="relative h-[38px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-500">
                      <button
                        type="submit"
                        className="text-sm px-1 py-2 text-center font-sans text-white sm:mx-auto "
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
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
