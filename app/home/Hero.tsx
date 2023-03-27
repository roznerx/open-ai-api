"use client"

import Image from "next/image"

export default function Feature() {
  return (
    <>
      <section className="mt-20">
        <h1 className="block w-full text-center text-5xl text-white dark:text-white sm:mx-auto sm:w-2/4 sm:text-6xl">
          Use it with your favorite libraries
        </h1>
        <p className="mx-auto mt-3 w-full px-3 text-center text-2xl text-white sm:w-1/2">
          Code Genius automates the process of generating boilerplate code for
          React, Angular, and VueJS libraries, allowing developers to focus on
          more critical aspects of the development process.
        </p>
      </section>
      <section className="mx-auto mt-16 flex justify-center gap-1 sm:gap-3 lg:mt-8 ">
        <Image
          className="rounded-md"
          src="/libs/react.svg"
          alt="React Library"
          width="143"
          height="197"
        />
        <Image
          className="rounded-md"
          src="/libs/vuejs.svg"
          alt="React Library"
          width="143"
          height="197"
        />
        <Image
          className="rounded-md"
          src="/libs/angular.svg"
          alt="React Library"
          width="143"
          height="197"
        />
      </section>
    </>
  )
}
