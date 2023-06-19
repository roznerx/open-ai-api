"use client"
import useWindowSize from "hooks/use-window-size"
import { usePathname } from "next/navigation"
import Header from "../Header"

export default function HeaderWrapper({
  session,
  userHasAccount,
  setShowSignInModal,
  showSignInModal,
}) {
  const pathname = usePathname()

  const { isMobile } = useWindowSize()
  const shouldHideLogo =
    isMobile &&
    (pathname == "/code-idea" ||
      pathname === "/code-chat" ||
      pathname === "/dashboard")
  return (
    <>
      <Header
        shouldHideLogo={shouldHideLogo}
        showSignInModal={showSignInModal}
        session={session}
        userHasAccount={userHasAccount}
        setShowSignInModal={setShowSignInModal}
      />
    </>
  )
}
