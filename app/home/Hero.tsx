"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero({ hasContent }) {
  return (
    <div
      className={`mb-10  ${
        hasContent ? "pt-16 sm:pt-0" : "pt-0"
      } flex flex-col items-center justify-center font-sans opacity-60 `}
    >
      <motion.div
        animate={{ y: [-30, 0] }}
        transition={{
          ease: "easeOut",
          duration: 2.5,
          repeat: Infinity,
        }}
      >
        <ArrowDown size={30} color="white" />
      </motion.div>
      <p className="text-[13px] text-white">Scroll</p>
    </div>
  )
}

{
  /* <section className="relative mx-auto mt-[10%] flex flex-col items-center justify-center">
        <h3 className="block w-full px-1 py-3 text-center font-sans text-2xl text-white sm:mx-auto sm:w-2/4 sm:text-4xl">
          A smarter, faster way to code with AI assistance.
        </h3>
        <p className="mx-auto mt-3 mb-10 w-full px-3 text-center font-sans text-2xl text-white sm:w-1/2">
          Code writing is tough and time-consuming. Code Genius helps enhance
          your skills. Discover new possibilities!
        </p>
      </section>
      <section className="z-40 mx-auto flex justify-center gap-1 sm:gap-3 ">
        <Image
          className="rounded-md"
          src="/libs/react.svg"
          alt="React JS Library"
          title="React JS Library"
          width="143"
          height="197"
        />
        <Image
          className="rounded-md"
          src="/libs/vuejs.svg"
          alt="Vue JS Library"
          title="Vue JS Library"
          width="143"
          height="197"
        />
        <Image
          className="rounded-md"
          src="/libs/angular.svg"
          alt="Angular JS Library"
          title="Angular JS Library"
          width="143"
          height="197"
        />
      </section> */
}
