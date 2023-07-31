"use client"

import { useSignInModal } from "app/components/modals/SignInModal"

export default function Client({ translations, modalTranslations }) {
  const { SignInModal } = useSignInModal({
    translations: modalTranslations,
  })

  return (
    <>
      <div className="flex min-h-screen flex-nowrap font-sans">
        <div className="mx-auto max-w-max pb-10">
          <SignInModal />

          <div className="mx-auto mt-28 w-[80%]">
            <h1 className="my-3 ml-4  text-3xl font-medium text-white">
              {translations.title}
            </h1>
            <p className="p-4 text-white">{translations.subtitle}</p>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.first.title}
            </h2>
            <p className="p-4 text-white">{translations.first.desc}</p>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.second.title}
            </h2>
            <p className="p-4 text-white">{translations.second.desc}</p>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.third.title}
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">{translations.third["desc-a"]}</p>
              <p className="p-4">{translations.third["desc-b"]}</p>
              <p className="p-4">{translations.third["desc-c"]}</p>
              <p className="p-4">{translations.third["desc-d"]}</p>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.fourth.title}
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">{translations.fourth["desc-a"]}</p>
              <p className="p-4">{translations.fourth["desc-b"]}</p>
              <p className="p-4">{translations.fourth["desc-c"]}</p>
              <p className="p-4">{translations.fourth["desc-d"]}</p>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.fifth.title}
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">{translations.fifth["desc-a"]}</p>
              <p className="p-4">{translations.fifth["desc-b"]}</p>
              <p className="p-4">{translations.fifth["desc-c"]}</p>
            </div>
            <h2 className="m-4 text-2xl font-medium text-white">
              {translations.sixth.title}
            </h2>
            <div className="p-4 text-white">
              <p className="p-4">{translations.sixth["desc-a"]}</p>
              <p className="p-4">{translations.sixth["desc-b"]}</p>
              <p className="p-4">{translations.sixth["desc-c"]}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
