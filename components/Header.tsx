import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./modals/SignInModal";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { useSession } from "next-auth/react";
import useScroll from "hooks/use-scroll";

export default function Header() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { data: session, status } = useSession();
  const scrolled = useScroll(50);
  return (
    <>
      <Head>
        <title>A-Intelligent Code Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex space-x-3">
            <h1 className="ml-2 text-2xl tracking-tight text-black max-md:pt-4 max-sm:pt-0 sm:text-4xl">
              AIntelligent Code
            </h1>
          </Link>
          <div>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                "User is logged in"
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
