"use client"

export default function SuperHero({ translations }) {
  return (
    <>
      <section className={`mb-5`}>
        <h2 className="z-40 items-center justify-center bg-clip-text p-3 text-center text-4xl font-semibold text-transparent text-white sm:flex sm:w-full sm:text-6xl">
          Generate quality code in seconds
        </h2>
        <p
          className="text-lg z-40 mt-2 w-[100%] items-center justify-center px-3 text-center 
         text-white sm:text-3xl"
        >
          {translations.subtitle}
        </p>
      </section>
    </>
  )
}
