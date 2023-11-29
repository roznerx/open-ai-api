"use client"

import Feedback from "../Feedback"
import UserMenu from "./UserMenu"

export default function UserDropdown({
  session,
  translations,
  setShowWidget,
  showWidget,
}) {
  const { email, image } = session?.user || {}

  if (!email) return null

  return (
    <>
      {session && (
        <div className="mr-14 mt-1 hidden flex-col items-end transition-all sm:flex ">
          <button
            onClick={() => setShowWidget((prev) => !prev)}
            className="mr-3 mt-1 flex h-4 w-28 items-center justify-center rounded-lg border
                   border-gray-300 bg-purple-900 p-4 text-gray-200 hover:cursor-pointer hover:text-gray-50"
          >
            <span>{translations?.feedback?.title}</span>
          </button>
          <Feedback
            translations={translations?.feedback}
            session={session}
            setShowWidget={setShowWidget}
            showWidget={showWidget}
          />
        </div>
      )}
      <UserMenu
        translations={translations}
        session={session}
        email={email}
        image={image}
      />
    </>
  )
}
