"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import React, { useEffect } from "react"
import ContactFormModal from "app/components/modals/ContactFormModal"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"
import GradientButton from "app/components/buttons/gradientButton"
import { Confetti } from "utils/confetti"
import { PromptCard as DashboardCard } from "app/components/shared/PromptCard"
import { useSession } from "next-auth/react"

const UpgradeAccount = ({ text, isPremium, subId, userId }) => (
  <Link
    href={isPremium ? `/settings?subId=${subId}&userId=${userId}` : "/pricing"}
  >
    <GradientButton width="200px" text={text} />
  </Link>
)

const ChatButton = ({ text }) => (
  <Link href="/code-chat">
    <GradientButton width="200px" text={text} />
  </Link>
)

export default function Client({ translations, headerTranslations }) {
  const { setShowSignInModal } = useSignInModal({ translations })
  const searchParams = useSearchParams()
  const router = useRouter()
  const [thanksMessage, setThanksMessage] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)
  const { dashboard } = translations
  const { data: session } = useSession()

  const userName = session?.user?.name

  const subscriptionHasBeenDeleted =
    searchParams?.has("action") &&
    searchParams.get("action") === "subscription-deleted"

  const isPremium =
    !subscriptionHasBeenDeleted && !!session?.user?.subscriptionId === true

  console.log("session?.user", session?.user)

  useEffect(() => {
    if (
      searchParams &&
      searchParams.has("session_id") &&
      session?.user?.subscriptionId
    ) {
      //THANKS MESSAGE WITH DIALOG
      setThanksMessage(true)
      setOpenContactForm(true)

      //SEND CONFETI
      Confetti()
    }
  }, [searchParams, session])

  useEffect(() => {
    if (
      searchParams &&
      searchParams.has("action") &&
      searchParams.get("action") === "subscription-deleted"
    ) {
      //SORRY TO SEE YOU GO MESSAGE
      setThanksMessage(true)
      setOpenContactForm(true)
    }
  }, [searchParams, router])

  console.log(
    "expression",
    !!session?.user?.subscriptionId && !subscriptionHasBeenDeleted,
  )

  return (
    <>
      <ContactFormModal
        thanksMessage={thanksMessage}
        isUnSubscribed={
          searchParams && searchParams.get("action") === "subscription-deleted"
        }
        clientName={userName}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
      <Header
        translations={headerTranslations}
        session={session}
        setShowSignInModal={setShowSignInModal}
      />
      <div className="flex w-screen items-center justify-center dark:bg-purple-900 sm:h-screen">
        <div className="absolute top-32 z-30 w-full bg-transparent sm:top-28">
          <h2 className="mx-auto flex w-full items-center justify-center px-12 text-center text-3xl text-gray-200 sm:items-start sm:text-5xl">
            {dashboard.welcome}, {userName}!
          </h2>
        </div>

        <div className="mb-12 mt-60 grid grid-cols-1 place-items-center gap-4 sm:mt-28 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-4">
          <DashboardCard
            onClick={() => {
              router.push("/code-idea?mode=smart")
            }}
            order="order-3"
            title={dashboard.smart.title}
            text={dashboard.smart.subtitle}
            imageSrc="/dashboard/smart.svg"
          />

          <DashboardCard
            onClick={() => {
              router.push("/code-idea?mode=improve")
            }}
            title={dashboard.performance.title}
            order="order-6"
            text={dashboard.performance.subtitle}
            imageSrc="/dashboard/bug.svg"
          />

          <DashboardCard
            onClick={() => {
              router.push("/code-idea?mode=test")
            }}
            order="order-4"
            title={dashboard.test.title}
            text={dashboard.test.subtitle}
            imageSrc="/dashboard/test.svg"
          />

          <DashboardCard
            onClick={() => {
              router.push("/code-idea?mode=docs")
            }}
            order="order-5"
            title={dashboard.docs.title}
            imageSrc="/dashboard/documentation.svg"
            text={dashboard.docs.subtitle}
          />
          <DashboardCard
            size="large"
            hasScale
            order="order-7 sm:order-7"
            imageSrc="/dashboard/credits.svg"
            button={<ChatButton text={dashboard.ctaChat} />}
            title={`Total Usage`}
            text={dashboard.available}
            onClick={undefined}
          />

          <DashboardCard
            size="large"
            hasScale
            order="order-8 sm:order-8"
            button={
              <UpgradeAccount
                text={
                  !!session?.user?.subscriptionId && !subscriptionHasBeenDeleted
                    ? dashboard.ctaSettings
                    : dashboard.ctaUpgrade
                }
                subId={session?.user?.subscriptionId}
                userId={session?.user?.id}
                isPremium={isPremium}
              />
            }
            title={dashboard.subscription}
            text={
              isPremium
                ? dashboard.premiumSubscription
                : dashboard.freeSubscription
            }
            imageSrc="/dashboard/code-box.svg"
            onClick={undefined}
          />
        </div>
      </div>
    </>
  )
}
