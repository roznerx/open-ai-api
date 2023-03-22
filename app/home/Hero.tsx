"use client"

import Image from "next/image"
import Link from "next/link"

export default function Feature() {
  return (
    <>
      <section>
        <h1 className="p-3 text-center text-5xl font-bold text-white dark:text-white">
          Create <p className="inline-block  text-mint">Genius Code</p>
        </h1>
        <p className="mt-2 px-3 text-center text-white">
          Create Better, Faster and Easier Code with your AI Genius.
        </p>
      </section>
      <section className="mt-20">
        <h1 className="mx-auto block max-w-md text-center text-5xl font-bold text-white dark:text-white">
          Use it with your favorite libraries
        </h1>
        <p className="mx-auto mt-3 max-w-lg px-3 text-center text-white">
          We support the most popular user interfaces libraries (UI) React,
          Angular, and VueJS. Developers can generate boilerplate code for
          various components and functionalities of these libraries, saving time
          and effort in the development process.
        </p>
      </section>
      <section className="mx-auto mt-16 flex justify-center gap-1 sm:gap-3 lg:mt-8 ">
        <Image
          className="rounded-md"
          src="libs/vuejs.svg"
          alt="React Library"
          width="143"
          height="197"
        />
        <Image
          className="rounded-md"
          src="libs/react.svg"
          alt="React Library"
          width="143"
          height="197"
        />
        <Image
          className="rounded-md"
          src="libs/angular.svg"
          alt="React Library"
          width="143"
          height="197"
        />
      </section>
    </>
  )
}
