import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react"

import { AnimatePresence } from "framer-motion"
import Leaflet from "app/components/shared/Leaflet"
import useWindowSize from "hooks/use-window-size"
import { useRouter, usePathname } from "next/navigation"

export default function BaseModal({
  children,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  const desktopModalRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.replace(pathname || "/")
        setShowModal(false)
      }
    },
    [pathname, router, setShowModal],
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])

  const { isMobile, isDesktop } = useWindowSize()

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && <Leaflet setShow={setShowModal}>{children}</Leaflet>}
          {isDesktop && (
            <>
              <div
                ref={desktopModalRef}
                key="desktop-modal"
                className="fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex"
              >
                {children}
              </div>
              <div
                key="desktop-backdrop"
                className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
                onClick={() => setShowModal(false)}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
