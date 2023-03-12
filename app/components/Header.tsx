"use client";

import Link from "next/link";
import { useSignInModal } from "./modals/SignInModal";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS, LSConfig } from "@/lib/constants";
import useScroll from "hooks/use-scroll";
import UserDropdown from "app/components/auth/UserDropdown";
import { useEffect } from "react";
import useLocalStorage from "hooks/use-localstorage";
import ColorModeDropdown from "./shared/ColorModeDropdown";

export default function Header({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [userId, setUserId] = useLocalStorage(LSConfig.user.userId, "");
  useEffect(() => {
    setUserId(session?.user?.id);
  }, [userId, setUserId]);
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0  w-full bg-white  ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex space-x-3">
            <h1 className="ml-2 text-2xl tracking-tight text-gray-700 dark:text-gray-300 max-md:pt-4 max-sm:pt-0 sm:text-4xl">
              A-Intelligent Code
            </h1>
          </Link>
          <div className="mt-2 flex sm:text-4xl">
            <ColorModeDropdown />
            <AnimatePresence>
              {!session ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
