"use client"

export default function SuperHero({ translations }) {
  return (
    <>
      <section className={`mb-5`}>
        <h2 className="z-40 items-center justify-center bg-clip-text p-3 text-center text-5xl font-semibold tracking-tight text-white sm:flex sm:w-full sm:text-6xl">
          {translations.title}
        </h2>
        <p
          className="text-lg z-40 mt-2 w-[90%] items-center justify-center px-10 text-center text-2xl text-white 
         sm:px-3 sm:text-3xl"
        >
          {translations.subtitle}
        </p>
      </section>
    </>
  )
}
