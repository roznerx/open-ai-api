"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2])

  return (
    <div className="mt-18">
      <section className="mx-auto mt-12 flex flex-col items-center justify-center">
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
        <p className="mx-auto mt-3 w-full px-3 text-center text-2xl text-white sm:w-1/2">
          Writing great code can be a challenging and time-consuming task, but
          with Code Genius you can take your skills to the next level! Explore
          the possibilities!
        </p>
      </section>
      <motion.div style={{ scale }}>
        <motion.div
          style={{
            // @ts-ignore
            scaleY: scrollYProgress - 1800,
          }}
          className="mx-auto -mt-[150px] h-[800px] w-[1000px] items-center justify-center rounded-full bg-gradient-radial from-gradient-dark/90 via-transparent to-transparent pb-9 brightness-50"
        ></motion.div>
      </motion.div>
      <section className="mx-auto mt-10 flex justify-center gap-1 sm:gap-3 lg:mt-8 ">
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
