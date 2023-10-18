"use client"

import ContactFormModal from "app/components/modals/ContactFormModal"
import { Switch } from "@headlessui/react"
import PaymentModal from "app/components/modals/PaymentModal"
import React, { useEffect, useState } from "react"
import { SUBSCRIPTION_PRICES } from "@/lib/constants"

import Faqs from "./faqs"
import { useSignInModal } from "app/components/modals/SignInModal"
import { useRouter } from "next/navigation"

import Image from "next/image"
import { Button } from "app/components/buttons/button"
import { Loader2 } from "lucide-react"

//Theme colors
// const colors: any = tailwindConfig.theme?.extend?.colors

type ClientPropTye = {
  session: any
  translations: any
  host: string
}

export default function Client({ host, session, translations }: ClientPropTye) {
  const [anual, setAnual] = useState(false)
  const { setShowSignInModal, SignInModal } = useSignInModal({
    translations: translations?.modals?.signIn,
  })
  const [loadingStripe, setLoadingStripe] = React.useState<boolean>(false)
  const router = useRouter()
  const [priceId, setPrecieId] = React.useState<string>("")
  const [openPayment, setOpenPayment] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

  const isStripeTestingEnv =
    host.includes("localhost") || host.includes("code-genius-mvp")

  const monthlyPrice = isStripeTestingEnv
    ? SUBSCRIPTION_PRICES.testing.premiumMonthly
    : SUBSCRIPTION_PRICES.production.premiumMonthly
  const anualPrice = isStripeTestingEnv
    ? SUBSCRIPTION_PRICES.testing.premiumAnual
    : SUBSCRIPTION_PRICES.production.premiumAnual

  console.log("locatoin hostname: ", host)
  console.log("isStripeTestingEnv:", isStripeTestingEnv)
  console.log("monthlyPrice: ", monthlyPrice)
  console.log("anualPrice: ", anualPrice)

  useEffect(() => {
    if (!anual) {
      setPrecieId(monthlyPrice)
    } else {
      setPrecieId(anualPrice)
    }
  }, [anual, anualPrice, monthlyPrice])

  console.log("priceId: ", priceId)

  const submitPaymentInstruction = async (e) => {
    e.preventDefault()
    setLoadingStripe(true)

    if (!session) {
      setShowSignInModal(true)
      return false
    }

    if (session?.user?.isPremium) {
      router.push("/dashboard")
      return false
    }

    try {
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
    } catch (error) {
      console.error("Error:", error)
    }
  }

  console.log("session", session)

  return (
    <>
      <SignInModal />
      <PaymentModal isOpen={openPayment} setIsOpen={setOpenPayment} />
      <ContactFormModal
        clientName={session && session?.user && session?.user?.name}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <div className=" mx-auto my-6 px-4 pt-20">
        <h2 className="mx-auto  mb-3 w-[80%] text-4xl font-semibold text-white sm:w-[100%] sm:text-6xl sm:leading-none sm:tracking-tight">
          {translations.pricing.title}
        </h2>
        <p className="mx-auto mt-8 w-[80%] text-2xl text-gray-100 sm:w-full">
          {translations.pricing.subtitle1}
        </p>
        <section className="flex w-full items-center justify-center py-12">
          <div className="container px-4 md:px-6">
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <div className="my-4 flex cursor-pointer flex-col justify-between rounded-lg bg-purple-600 p-8 shadow-lg ">
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
                    className={`mx-auto my-4 mt-2 flex w-[250px] flex-row items-center justify-center 
      rounded-lg p-[1px] 
    sm:items-start sm:justify-center`}
                  >
                    <div className="relative h-[38px] w-[100%] items-center justify-center rounded-lg border border-mint bg-transparent">
                      <button
                        type="submit"
                        className="text-sm  px-1 py-1.5 text-center font-sans text-gray-300 sm:mx-auto "
                      >
                        {session?.user?.isPremium
                          ? "Free Plan"
                          : "Current Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex cursor-pointer flex-col justify-between rounded-lg border border-mint bg-purple-600 p-8 shadow-md shadow-mint/30 hover:shadow-lg hover:shadow-mint/30">
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
                    Premium
                  </h3>

                  <div className="mt-4 text-center text-white ">
                    <span className="text-4xl font-bold text-white">
                      ${anual ? "50" : `5`}
                    </span>{" "}
                    /{anual ? " anual" : " month"}
                  </div>
                  <div>
                    <Switch
                      checked={anual}
                      onChange={setAnual}
                      className={`${anual ? "bg-mint/90" : "bg-gray-200"}
          relative inline-flex h-5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-1  focus-visible:ring-black focus-visible:ring-opacity-75`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${anual ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-purple-900 shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
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
                    className="group w-full cursor-pointer border border-mint bg-transparent font-sans font-medium outline-none hover:bg-mint/90 hover:font-semibold hover:text-purple-900 active:outline-none"
                  >
                    {loadingStripe ? (
                      <div className="flex h-8">
                        <Loader2
                          className="mt-[6px] animate-spin text-white group-hover:text-purple-900"
                          size={20}
                        />
                        <span className="pl-2 pt-1 font-[12px] text-white group-hover:text-purple-900">
                          Redirecting..
                        </span>
                      </div>
                    ) : (
                      <span className="bg-transparent text-white group-hover:text-purple-900">
                        {session?.user?.isPremium
                          ? "Current Plan"
                          : translations.pricing.premium.cta}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              <div className="my-4 flex cursor-pointer flex-col justify-between rounded-lg bg-purple-600 p-8 shadow-lg">
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
                    <div className="relative h-[38px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-mint/90 hover:font-semibold hover:text-purple-900">
                      <button
                        type="submit"
                        className="text-sm font-sanssm:mx-auto px-1 py-2 text-center "
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
