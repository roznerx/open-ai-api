"use client"

import ContactFormModal from "app/components/modals/ContactFormModal"
import PaymentModal from "app/components/modals/PaymentModal"
import Image from "next/image"
import React, { useEffect } from "react"
import tailwindConfig from "tailwind.config"
import { Check, Loader2 } from "lucide-react"
import { SUBSCRIPTION_PRICES } from "@/lib/constants"
import Header from "app/components/Header"
import Faqs from "./faqs"
import { useSignInModal } from "app/components/modals/SignInModal"
import Footer from "app/components/Footer"
import { useRouter } from "next/navigation"

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
  const [subscription, setSubscription] = React.useState<boolean>(false)
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
    // console.log("response:", response)

    const stripeSession = await response.json()

    // setLoadingStripe(false)

    if (stripeSession) {
      await fetch("/api/checkout/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          userId: session?.user?.id,
          name: session?.user?.name,
          checkoutURL: stripeSession?.session?.url,
          created: stripeSession?.session?.created,
          amount: stripeSession?.session?.amount_total,
          confirmed: false,
        }),
      })
      console.log("stripeSession?.session", stripeSession?.session)

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

        <section className="mt-12 flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
          {/* <!-- Premium  Card --> */}
          <div className="w-full rounded-lg bg-purple-700 p-6 text-white shadow-sm sm:w-[476px] ">
            <Image
              src="/icons/premium.svg"
              alt="Premium membership"
              width={40}
              height={40}
              className="mx-auto"
            />
            <h3 className="my-2 mb-2 text-2xl font-semibold text-mint">
              {translations.pricing.premium.title}
            </h3>
            <div className="my-4 flex items-center justify-center">
              <span className="text-center text-5xl font-semibold">
                $ 5.00 USD
              </span>
            </div>
            <div
              className={`mx-auto my-4 mb-4 mt-2 flex w-[250px] cursor-pointer flex-row items-center justify-center 
      rounded-lg bg-gradient-to-r from-mint to-blue p-[2px] font-mono hover:font-semibold
    sm:items-start sm:justify-center`}
            >
              <div
                onClick={submitPaymentInstruction}
                className="relative h-[48px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-700 hover:bg-purple-500"
              >
                <button
                  type="submit"
                  className="text-sm px-1 py-3 text-center font-sans text-white sm:mx-auto sm:px-2"
                >
                  {loadingStripe ? (
                    <div className="flex h-8">
                      <Loader2 className="mt-[2px] animate-spin" size={20} />
                      <span className="ml-2">Redirecting..</span>
                    </div>
                  ) : (
                    translations.pricing.premium.cta
                  )}
                </button>
              </div>
            </div>

            {/* <!-- List --> */}
            <ul
              role="list"
              className="my-6 ml-12 flex w-full flex-col items-center justify-center space-y-4 pl-2 text-center sm:ml-20 sm:pl-2"
            >
              <li className="flex w-full space-x-3 self-center">
                {/* <!-- Icon --> */}
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span>{translations.pricing.premium.features.smart}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span> {translations.pricing.premium.features.test}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span> {translations.pricing.premium.features.improve}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span> {translations.pricing.premium.features.docs}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span> {translations.pricing.premium.features.chat}</span>
              </li>
            </ul>
          </div>
          {/* <!-- Enterprice Card --> */}
          <div className="w-full rounded-lg bg-purple-700 p-6 text-white shadow-sm sm:w-[476px] ">
            <Image
              src="/icons/enterprice.svg"
              alt="Premium membership"
              width={40}
              height={40}
              className="mx-auto"
            />
            <h3
              className={`mb-4 mt-2 bg-gradient-to-r from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] bg-clip-text text-2xl font-semibold text-transparent`}
            >
              {translations.pricing.enterprice.title}
            </h3>
            <div className="my-4 flex flex-col items-center justify-center">
              <span className="mr-2 text-center text-5xl font-semibold">
                $ 15 USD
              </span>
              <span className="text-sm my-2 inline-block pt-2 text-center">
                {translations.pricing.enterprice.perUser}
              </span>
            </div>
            <div
              onClick={() => setOpenContactForm(true)}
              className={`mx-auto my-4 mb-4 mt-2 flex w-[250px] cursor-pointer flex-row items-center justify-center 
      rounded-lg bg-gradient-to-r from-mint to-blue p-[2px] font-mono  hover:font-semibold
    sm:items-start sm:justify-center`}
            >
              <div className="relative h-[48px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-700 hover:bg-purple-500">
                <button
                  type="submit"
                  className="text-sm px-1 py-3 text-center font-sans text-white sm:mx-auto sm:px-2"
                >
                  {translations.pricing.enterprice.cta}
                </button>
              </div>
            </div>
            <ul
              role="list"
              className="my-6 ml-12 flex w-full flex-col items-center justify-center space-y-4 pl-2 text-center sm:ml-20 sm:pl-2"
            >
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span>{translations.pricing.enterprice.features["1"]}</span>
              </li>
              <li className="flex w-full space-x-3">
                {/* <!-- Icon --> */}
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span>{translations.pricing.enterprice.features["2"]}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span>{translations.pricing.enterprice.features["3"]}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span>{translations.pricing.enterprice.features["4"]}</span>
              </li>
              <li className="flex w-full space-x-3">
                <Check color={colors.mint} className="mt-[2px]" size={20} />
                <span>{translations.pricing.enterprice.features["5"]}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="mt-10 w-full">
        <Faqs translations={translations.pricing.faqs} />
      </div>
      <Footer translations={translations.footer} session={session?.data} />
    </>
  )
}
