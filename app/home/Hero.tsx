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

        <motion.div style={{ scale }}>
          <motion.div
            style={{
              // @ts-ignore
              scaleY: scrollYProgress - 1900,
            }}
            className="absolute left-1/2 top-10 mx-auto -mt-[100px] hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform items-center  justify-start rounded-full bg-gradient-radial from-gradient-dark/80 via-transparent to-transparent pb-9 brightness-50 sm:-mt-[150px] sm:block sm:h-[800px] sm:w-[1000px]"
          ></motion.div>
        </motion.div>
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
