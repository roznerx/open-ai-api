"use client"

import ContactFormModal from "app/components/modals/ContactFormModal"
import { Switch } from "@headlessui/react"
import PaymentModal from "app/components/modals/PaymentModal"
import React, { useEffect, useState } from "react"
import { SUBSCRIPTION_PRICES } from "@/lib/constants"

import Faqs from "./faqs"
import { useSignInModal } from "app/components/modals/SignInModal"
import { useRouter, useSearchParams } from "next/navigation"

import Image from "next/image"
import { Button } from "app/components/buttons/button"
import { Loader2 } from "lucide-react"

//Theme colors
// const colors: any = tailwindConfig.theme?.extend?.colors

type ClientPropTye = {
  session: any
  translations: any
  modalTranslations?: any
  host: string
}

export default function Client({
  host,
  session,
  translations,
  modalTranslations,
}: ClientPropTye) {
  const [anual, setAnual] = useState(true)
  const { setShowSignInModal, SignInModal } = useSignInModal({
    translations: translations?.modals?.signIn,
  })
  const [loadingStripe, setLoadingStripe] = React.useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
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

  useEffect(() => {
    if (
      searchParams?.has("action") &&
      searchParams.get("action") === "subscribe"
    ) {
      submitPaymentInstruction()
    }
  }, [searchParams, priceId])

  useEffect(() => {
    if (!anual) {
      setPrecieId(monthlyPrice)
    } else {
      setPrecieId(anualPrice)
    }
  }, [anual, anualPrice, monthlyPrice])

  const submitPaymentInstruction = async () => {
    // e.preventDefault()
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

      if (stripeSession) {
        router.push(stripeSession?.session?.url)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <SignInModal />
      <PaymentModal isOpen={openPayment} setIsOpen={setOpenPayment} />
      <ContactFormModal
        translations={modalTranslations}
        clientName={session && session?.user && session?.user?.name}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <div className="mx-auto my-6 px-4 pt-20">
        <h2 className="mx-auto mb-3 w-[80%] text-4xl font-semibold text-white sm:w-[100%] sm:text-6xl sm:leading-none sm:tracking-tight">
          {translations?.title}
        </h2>
        <p className="mx-auto mt-4 w-[80%] text-2xl text-white sm:w-full">
          {translations?.subtitle}
        </p>
        <p className="mx-auto mt-2 w-[80%] text-2xl text-white sm:w-full">
          {translations?.subtitle1}
        </p>
        {/* <div className="mt-10 h-auto w-auto rounded-xl bg-gradient-to-br from-purple-500 via-purple-400 to-purple-500 p-4 text-white"> */}
        {/* <p className="mx-auto mt-1 w-[80%] text-2xl sm:w-full">
            {translations.subtitle2}
          </p> */}
        {/* </div> */}
        <section className="flex w-full items-center justify-center py-12">
          <div className="container px-4 md:px-6">
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <div className="my-16 flex cursor-pointer flex-col justify-between rounded-lg bg-purple-700 p-8 shadow-lg ">
                <div>
                  <Image
                    src="/icons/starter.svg"
                    alt="starter membership"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <h3
                    className={`sm:text-xl sm:text-xl bg-gradient-to-r from-[#8ABFE5] to-[#B1EAF1] bg-clip-text text-center
                    font-sans text-3xl font-bold tracking-tight text-transparent sm:ml-2 sm:mt-2 sm:leading-6`}
                  >
                    {translations?.basic?.title}
                  </h3>

                  <div className="mt-4 text-center text-white">
                    <span className="text-4xl font-bold">
                      {translations?.basic?.subtitle}
                    </span>
                    <p>{translations?.basic?.perfect}</p>
                  </div>
                  <p className="mt-6 flex justify-center font-semibold text-white">
                    {translations.included}
                  </p>
                  <ul className="mt-8 space-y-4 text-left text-white sm:mx-8 md:mx-8">
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
                      {translations.basic.features["smart"]}
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
                      {translations.basic.features["chat"]}
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
                      {translations.basic.features["support"]}
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
                      {translations.basic.features["copy"]}
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div
                    className={`mx-auto my-4 mt-2 flex flex-row items-center justify-center 
      rounded-lg p-[1px] 
    sm:items-start sm:justify-center`}
                  >
                    <div className="relative h-[38px] w-[100%] items-center justify-center rounded-lg border border-mint bg-transparent">
                      <button
                        type="submit"
                        className="text-sm  px-1 py-1.5 text-center font-sans text-gray-300 sm:mx-auto "
                      >
                        {session?.user?.isPremium
                          ? translations.free
                          : translations.basic.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative my-8 flex cursor-pointer flex-col  rounded-lg border border-mint bg-purple-700 p-8 shadow-md shadow-mint/30 hover:shadow-lg hover:shadow-mint/30">
                <Image
                  src="/icons/premium.svg"
                  alt="Premium plan"
                  width={40}
                  height={40}
                  className="mx-auto "
                />
                <div className="text-sm absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-mint px-3 py-1 font-semibold text-purple-700 ">
                  {translations.popular}
                </div>
                <div className="relative mx-auto">
                  <h3
                    className={`sm:text-xl sm:text-xl bg-gradient-to-r from-[#72D7D3] to-[#2C9DC0] bg-clip-text
                    text-center font-sans text-3xl font-bold tracking-tight text-transparent sm:ml-2 sm:mt-2 sm:leading-6`}
                  >
                    Premium
                  </h3>

                  <div className="mt-4 flex w-full justify-center text-center text-white">
                    <span className="text-4xl font-bold text-white">
                      $ {anual ? "6" : `8`}
                    </span>
                  </div>
                  <div className="mb-4 flex w-full justify-center text-center text-white">
                    <p className="text-base text-white">
                      {anual
                        ? translations.premium.year
                        : translations.premium.month}
                    </p>
                  </div>
                  <div className="mx-auto flex h-12 w-52 items-center justify-center rounded-lg bg-purple-500 py-2">
                    <span
                      className={`${
                        !anual ? "text-white" : "text-gray-300"
                      } pr-2`}
                    >
                      Monthly
                    </span>
                    <Switch
                      checked={anual}
                      onChange={setAnual}
                      className={`${anual ? "bg-mint/90" : "bg-mint/50"}
          relative inline-flex h-5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-1  focus-visible:ring-black focus-visible:ring-opacity-75`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${anual ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-purple-900 shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <span
                      className={`${
                        anual ? "text-white" : "text-gray-300"
                      } pl-2`}
                    >
                      Yearly
                    </span>
                  </div>
                  <p className="mt-6 flex justify-center font-semibold text-white">
                    {translations.included}
                  </p>
                  <ul className="mt-4 w-full space-y-4 text-left text-white sm:mx-8 md:mx-8">
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
                      {translations.premium.features.smart}
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
                      {translations.premium.features.test}
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
                      {translations.premium.features.improve}
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
                      {translations.premium.features.docs}
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
                      {translations.premium.features.chat}
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
                      {translations.premium.support}
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={submitPaymentInstruction}
                    className="group w-full cursor-pointer bg-mint font-sans font-medium outline-none hover:bg-mint/90 hover:font-semibold hover:text-purple-900 active:outline-none"
                  >
                    {loadingStripe ? (
                      <div className="flex h-8">
                        <Loader2
                          className="mt-[6px] animate-spin text-purple-900"
                          size={20}
                        />
                        <span className="pl-2 pt-1 font-[12px] text-purple-900">
                          {translations.processing}
                        </span>
                      </div>
                    ) : (
                      <span className="bg-transparent text-purple-900 group-hover:text-purple-900">
                        {session?.user?.isPremium
                          ? translations.basic.cta
                          : translations.premium.cta}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              <div className="my-16 flex cursor-pointer flex-col justify-between rounded-lg bg-purple-700 p-8 shadow-lg">
                <div className="text-white">
                  <Image
                    src="/icons/enterprice.svg"
                    alt="Enterprise"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <h3
                    className={`sm:text-xl sm:text-xl bg-gradient-to-r from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] bg-clip-text text-center
                    font-sans text-3xl font-bold tracking-tight text-transparent sm:ml-2 sm:mt-2 sm:leading-6`}
                  >
                    {translations?.enterprice?.title}
                  </h3>
                  <h2 className="mx-auto my-3 w-full font-semibold text-white sm:w-[100%] sm:text-4xl sm:leading-none sm:tracking-tight">
                    {translations?.enterprice?.cta}
                  </h2>
                  <p className="text-white">
                    {" "}
                    {translations?.enterprice?.perfect}
                  </p>
                  <p className="mt-6 flex justify-center font-semibold text-white">
                    {translations?.included}?{" "}
                  </p>
                  <ul className="mt-10 w-full space-y-4 text-left md:mx-8">
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

                      {translations?.enterprice?.features["1"]}
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
                      {translations?.enterprice?.features["2"]}
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
                      {translations?.enterprice?.features["3"]}
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
                      {translations?.enterprice?.features["4"]}
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
                      {translations?.enterprice?.support}
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
                    <div className="relative h-[38px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-700 text-white hover:font-semibold">
                      <button
                        type="submit"
                        className="text-sm font-sanssm:mx-auto px-1 py-2 text-center "
                      >
                        {translations?.enterprice?.contactUs}
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
        <Faqs translations={translations.faqs} />
      </div>
    </>
  )
}
