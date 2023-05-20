"use client"

import GradientButton from "app/components/buttons/gradientButton"
import ContactFormModal from "app/components/modals/ContactFormModal"
import PaymentModal from "app/components/modals/PaymentModal"
import Image from "next/image"
import React, { useEffect } from "react"
import tailwindConfig from "tailwind.config"
import { Check, Loader2 } from "lucide-react"
import { PRICE_IDS } from "@/lib/constants"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"
import Footer from "app/components/Footer"

//Theme colors
const colors: any = tailwindConfig.theme?.extend?.colors

type ClientPropTye = {
  session: any
}

export default function Client({ session }: ClientPropTye) {
  const initialCreditsValue = 50
  const [credits, setCredits] = React.useState<number>(initialCreditsValue)
  const { setShowSignInModal, SignInModal } = useSignInModal({})
  const [loadingStripe, setLoadingStripe] = React.useState<boolean>(false)

  const [priceId, setPrecieId] = React.useState<string>("")
  const [openPayment, setOpenPayment] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)

  useEffect(() => {
    if (credits === 50) {
      setPrecieId(PRICE_IDS[50])
    } else if (credits === 100) {
      setPrecieId(PRICE_IDS[100])
    } else if (credits === 150) {
      setPrecieId(PRICE_IDS[150])
    }
  }, [credits])

  const getCreditPrice = () => {
    switch (credits) {
      case 50:
        return 5.0
      case 100:
        return 8.0
      case 150:
        return 15.0
    }
  }

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
        credits,
        priceUID: priceId,
        userId: session?.user?.id,
      }),
    })
    console.log("response:", response)

    const stripeSession = await response.json()

    // setLoadingStripe(false)
    console.log("stripeSession", stripeSession)
    if (stripeSession) {
      await fetch("/api/checkout/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credits,
          email: session?.user?.email,
          userId: session?.user?.id,
          name: session?.user?.name,
          checkoutURL: stripeSession?.session?.url,
          created: stripeSession?.session?.created,
          amount: stripeSession?.session?.amount_total,
          confirmed: false,
        }),
      })
      location.href = stripeSession?.session?.url
    }
  }

  return (
    <>
      <SignInModal />
      <Header session={session} setShowSignInModal={setShowSignInModal} />
      <PaymentModal isOpen={openPayment} setIsOpen={setOpenPayment} />
      <ContactFormModal
        clientName={session && session?.user && session?.user?.name}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <section className="grid grid-cols-1 space-y-12 pt-9 md:grid-cols-1 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-2">
        {/* <!-- Premium  Card --> */}
        <div className="mx-auto flex w-full max-w-lg flex-col rounded-lg bg-purple-700 p-6 text-white shadow-sm sm:min-w-[476px]  xl:p-8">
          <Image
            src="/icons/premium.svg"
            alt="Premium membership"
            width={40}
            height={40}
            className="mx-auto"
          />
          <h3 className="my-2 mb-2 text-2xl font-semibold text-mint">
            Premium
          </h3>
          <div className="my-4 flex items-center justify-center">
            <span className="text-center text-5xl font-extrabold">
              $ {getCreditPrice()} USD
            </span>
          </div>
          <div className="my-4 mx-auto">
            <button
              onClick={() => setCredits(50)}
              className={`text-xs leading-sm active:bg-bg-morado ml-4 inline-flex w-16 cursor-pointer items-center justify-center rounded-full border border-white px-3 py-1 font-bold uppercase text-white hover:border 
                  hover:border-morado  hover:bg-purple-500 focus:bg-morado ${
                    credits === 50
                      ? "border-morado bg-morado"
                      : "bg-transparent"
                  } `}
            >
              50
            </button>
            <button
              onClick={() => setCredits(100)}
              className={`text-xs leading-sm hover:bg-purple-1000 ml-4 inline-flex w-16 cursor-pointer items-center justify-center rounded-full border border-white px-3 py-1 font-bold uppercase text-white hover:border hover:border-morado focus:bg-morado  ${
                credits === 100 ? "border-morado bg-morado" : "bg-transparent"
              } `}
            >
              100
            </button>
            <button
              onClick={() => setCredits(150)}
              className={`text-xs leading-sm ml-4 inline-flex w-16 cursor-pointer items-center justify-center rounded-full border border-white px-3 py-1 font-bold uppercase text-white hover:border hover:border-morado hover:bg-purple-500 focus:bg-morado ${
                credits === 150 ? "border-morado bg-morado" : "bg-transparent"
              } `}
            >
              150
            </button>
          </div>
          <div
            className={`my-4 mx-auto mb-4 mt-2 flex w-[80%] cursor-pointer flex-row items-center justify-center 
      rounded-lg bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] p-[2px] font-mono
    sm:items-start sm:justify-center`}
          >
            <div
              onClick={submitPaymentInstruction}
              className="relative h-[48px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-purple-700"
            >
              <button
                type="submit"
                className="text-sm  px-1 py-3 text-center font-sans text-white sm:mx-auto sm:px-2"
              >
                {loadingStripe ? (
                  <div className="flex h-8">
                    <Loader2 className="mt-[2px] animate-spin" size={20} />
                    <span className="ml-2">Redirecting..</span>
                  </div>
                ) : (
                  "Buy Credits"
                )}
              </button>
            </div>
          </div>

          {/* <!-- List --> */}
          <ul
            role="list"
            className="my-6 flex flex-col items-center space-y-4 sm:ml-11 sm:items-start "
          >
            <li className="flex w-64 items-center  space-x-3">
              {/* <!-- Icon --> */}
              <Check color={colors.mint} size={20} />
              <span>Individual configuration</span>
            </li>
            <li className="flex w-64 items-center space-x-3">
              <Check color={colors.mint} size={20} />
              <span>
                Team size: <span className="font-semibold">1 developer</span>
              </span>
            </li>
            <li className="flex w-64 items-center space-x-3">
              <Check color={colors.mint} size={20} />
              <span>
                Premium support: <span className="font-semibold">6 months</span>
              </span>
            </li>
            <li className="flex w-64 items-center space-x-3">
              <Check color={colors.mint} size={20} />
              <span>
                Free updates: <span className="font-semibold">6 months</span>
              </span>
            </li>
          </ul>
        </div>
        {/* <!-- Enterprice Card --> */}
        <div className="mx-auto flex w-full max-w-lg flex-col rounded-lg bg-purple-700 p-6 text-white shadow-sm sm:min-w-[476px] xl:p-8">
          <Image
            src="/icons/enterprice.svg"
            alt="Premium membership"
            width={40}
            height={40}
            className="mx-auto"
          />
          <h3
            className={`mt-2 mb-4 bg-gradient-to-r from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] bg-clip-text text-2xl font-semibold text-transparent`}
          >
            Enterprise
          </h3>
          <div className="my-4 flex flex-col items-center justify-center">
            <span className="mr-2 text-center text-5xl font-extrabold">
              $ 19.99 USD
            </span>
            <span className="text-sm mt-7 text-center">
              Per user, per month.
            </span>
          </div>
          <GradientButton
            text="Contact Us"
            onClick={() => setOpenContactForm(true)}
          />

          <ul
            role="list"
            className="my-6 flex flex-col items-center space-y-4 text-left sm:ml-11 sm:items-start"
          >
            <li className="flex w-64 items-center  space-x-3">
              <Check color={colors.mint} size={20} />
              <span className="font-bold">Everything in Premium plus:</span>
            </li>
            <li className="flex w-64 items-center  space-x-3">
              {/* <!-- Icon --> */}
              <Check color={colors.mint} size={20} />
              <span>Individual configuration</span>
            </li>
            <li className="flex w-64 items-center space-x-3">
              <Check color={colors.mint} size={20} />
              <span>
                Team size: <span className="font-semibold">1 developer</span>
              </span>
            </li>
            <li className="flex w-64 items-center space-x-3">
              <Check color={colors.mint} size={20} />
              <span>
                Premium support: <span className="font-semibold">6 months</span>
              </span>
            </li>
            <li className="flex w-64 items-center space-x-3">
              <Check color={colors.mint} size={20} />
              <span>
                Free updates: <span className="font-semibold">6 months</span>
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="pt-20">
        {/* <h2 className="mb-3 text-3xl font-bold text-gray-200 dark:text-white sm:text-4xl sm:leading-none sm:tracking-tight">
          Frequently asked questions
        </h2> */}
      </section>
      <Footer session={session?.data} />
    </>
  )
}
