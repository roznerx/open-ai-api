"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import React, { useEffect } from "react"
import ContactFormModal from "app/components/modals/ContactFormModal"

import Button from "app/components/buttons/gradientButton"
import { Confetti } from "utils/confetti"
import { PromptCard as DashboardCard } from "app/components/shared/PromptCard"

const UpgradeAccount = ({ text, isPremium, subId, userId }) => (
  <Link
    href={isPremium ? `/settings?subId=${subId}&userId=${userId}` : "/pricing"}
  >
    <Button text={text} />
  </Link>
)

export default function Client({
  subscriptionId,
  translations,
  session,
  isPremium: isProUser,
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPremium, setIsPremium] = React.useState<boolean>(isProUser)
  const [thanksMessage, setThanksMessage] = React.useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = React.useState<boolean>(false)
  const { dashboard } = translations

  const userName = session?.user?.name

  const subscriptionHasBeenDeleted =
    searchParams?.has("action") &&
    searchParams.get("action") === "subscription-deleted"

  useEffect(() => {
    if (
      (searchParams && searchParams.has("session_id")) ||
      session?.user?.isPremium
    ) {
      setIsPremium(true)
    }
  }, [searchParams, session?.user?.isPremium])

  // console.log("session info", session?.user)

  useEffect(() => {
    if (searchParams && searchParams.has("session_id")) {
      //THANKS MESSAGE WITH DIALOG
      setThanksMessage(true)
      setOpenContactForm(true)

      //SEND CONFETI
      Confetti()
    }
  }, [searchParams])

  useEffect(() => {
    if (subscriptionHasBeenDeleted) {
      setIsPremium(false)
      //SORRY TO SEE YOU GO MESSAGE
      setThanksMessage(true)
      setOpenContactForm(true)
    }
  }, [searchParams, router, subscriptionHasBeenDeleted])

  return (
    <>
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
          isChat
          hasScale
          order="order-7 sm:order-7"
          title={`Genius Chat`}
          text={`Ask to Code Genius and explore the vast collection of useful code examples to make your development process faster and more efficient`}
          onClick={undefined}
          pill={
            <button className=" h-auto w-auto rounded-full bg-moradoCode px-2 py-1 text-[13px] font-semibold text-purple-400 sm:absolute sm:-right-4">
              New Feature
            </button>
          }
          button={
            <Link href="/code-chat" className="">
              <Button width="200px" text={"Go to Chat"} />
            </Link>
          }
        />
        <DashboardCard
          size="large"
          isSub
          imageSrc="/dashboard/subscription.svg"
          hasScale
          order="order-8 sm:order-8"
          title={
            isPremium
              ? `Premium ${dashboard.subscription}`
              : "You have a Free Plan"
          }
          text={
            isPremium
              ? `You currently have the ${dashboard.premiumSubscription}. You have acces to these features: Chat, smart Suggestions, code improvements, automated tests generation and docs generation.`
              : "Unlock Code Genius Premium to access a world of advanced features, including Unit Test Generation, Code Improvements, and Docs Generation – all at your fingertips!"
          }
          button={
            <UpgradeAccount
              isPremium={isPremium}
              subId={session?.user?.subscriptionId || subscriptionId}
              userId={session?.user?.id}
              text={isPremium ? "Manage Subscription" : "Upgrade plan"}
            />
          }
          onClick={undefined}
        />
      </div>
      <ContactFormModal
        thanksMessage={thanksMessage}
        isUnSubscribed={
          searchParams && searchParams.get("action") === "subscription-deleted"
        }
        clientName={userName}
        isOpen={openContactForm}
        setIsOpen={setOpenContactForm}
      />
    </>
  )
}
