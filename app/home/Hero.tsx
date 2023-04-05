"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Hero() {
  const { scrollYProgress, scrollY } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 2])

  return (
    <div className="mt-18">
      <section className="relative mx-auto mt-12 flex flex-col items-center justify-center">
        <Image
          alt="Code Genius"
          src={"/icons/genius.svg"}
          width={100}
          height={100}
        />
        <h3 className="block w-full px-1 py-3 text-center text-2xl text-white sm:mx-auto sm:w-2/4 sm:text-4xl">
          The AI programming assistant that helps you coding faster, easier, and
          more efficient!
        </h3>
        <p className="mx-auto mt-3 w-full px-3 text-center text-2xl text-white sm:mb-[200px] sm:w-1/2">
          Writing great code can be a challenging and time-consuming task, but
          with Code Genius you can take your skills to the next level! Explore
          the possibilities!
        </p>
      </section>
      <section className="mx-auto flex justify-center gap-1 sm:mt-[20px] sm:gap-3 ">
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
      </section>
    </div>
  )
}
