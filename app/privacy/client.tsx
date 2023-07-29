"use client"

import { useSignInModal } from "app/components/modals/SignInModal"
import HeaderWrapper from "app/components/shared/HeaderWrapper"
import Link from "next/link"

export default function Client({
  session,
  translations,
  modalTranslations,
  headerTranslations,
}) {
  const { SignInModal, setShowSignInModal, showSignInModal } = useSignInModal({
    translations: modalTranslations,
  })

  return (
    <>
      <div className="font-inter flex min-h-screen flex-nowrap">
        <div className="mx-auto max-w-max pb-10">
          <SignInModal />
          <HeaderWrapper
            translations={headerTranslations}
            setShowSignInModal={setShowSignInModal}
            showSignInModal={showSignInModal}
            session={session}
            userHasAccount={undefined}
          />
          <div className="mx-auto mt-28 w-[80%]">
            <h1 className="my-3 ml-4 text-3xl font-medium text-white">
              {translations.title}
            </h1>
            <p className="p-4 text-white">
              {translations.intro1}{" "}
              <Link href="https://code-genius.dev">
                https://code-genius.dev
              </Link>
              {translations.intro2}{" "}
              <Link href="mailto:info@code-genius.dev">
                {translations.contactUs}
              </Link>
              {translations.thisPrivacy}
            </p>

            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.personal.title}
            </h2>

            <div className="p-4 text-white">
              {translations.personal.collect}{" "}
              <span className="font-medium">
                {translations.personal.collect1}
              </span>
              {translations.personal.collect2}
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">{translations.personal.list["1"]}</li>
                <li className="mt-2"> {translations.personal.list["2"]}</li>
                <li className="mt-2">{translations.personal.list["3"]}</li>
                <li className="mt-2">{translations.personal.list["4"]}</li>
                <li className="mt-2">{translations.personal.list["5"]}</li>
                <li className="mt-2">
                  We use cookies to operate and administer our Services, and
                  {translations.personal.list["6"]}{" "}
                  <Link
                    className="underline"
                    href="https://allaboutcookies.org/"
                  >
                    {translations.personal.list["7"]}
                  </Link>
                </li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.infoUsage.title}
            </h2>

            <div className="p-4 text-white">
              {translations.infoUsage.title2}
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">{translations.infoUsage.list["1"]}</li>
                <li className="mt-2">{translations.infoUsage.list["2"]}</li>
                <li className="mt-2">{translations.infoUsage.list["3"]}</li>
                <li className="mt-2">{translations.infoUsage.list["4"]}</li>
                <li className="mt-2">{translations.infoUsage.list["5"]}</li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.disclosure.title}
            </h2>

            <div className="p-4 text-white">
              {translations.disclosure.title2}
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">{translations.disclosure.list["1"]}</li>
                <li className="mt-2">{translations.disclosure.list["2"]}</li>
                <li className="mt-2">{translations.disclosure.list["3"]}</li>
                <li className="mt-2">{translations.disclosure.list["4"]}</li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.dataRights.title}
            </h2>
            <div className="p-4 text-white">
              {translations.dataRights.title2}
              <ul className="ml-5 mt-5 list-disc">
                <li className="mt-2">{translations.dataRights.list["1"]}</li>
                <li className="mt-2">{translations.dataRights.list["2"]}</li>
                <li className="mt-2">{translations.dataRights.list["3"]}</li>
                <li className="mt-2">{translations.dataRights.list["4"]}</li>
                <li className="mt-2">{translations.dataRights.list["5"]}</li>
                <li className="mt-2">{translations.dataRights.list["6"]}</li>
              </ul>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations?.links?.title}
            </h2>
            <p className="p-4 text-white">{translations.links.p1}</p>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.security.title}
            </h2>
            <p className="p-4 text-white">{translations.security.p1}</p>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.changes.title}
            </h2>
            <p className="p-4 text-white">{translations.changes.p1}</p>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.contact.title}
            </h2>
            <p className="p-4 text-white">
              {translations.contact.please}{" "}
              <Link className="underline" href="mailto:info@code-genius.dev">
                {translations.contact.support}
              </Link>{" "}
              {translations.contact.p1}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
