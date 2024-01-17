"use client"

export default function SuperHero({ translations }) {
  return (
    <>
      <section className={`mb-5`}>
        <h2 className="z-40 items-center justify-center p-3 text-center text-5xl font-extrabold tracking-tight text-slate-200 sm:flex sm:w-full sm:text-6xl">
          {translations.title}
        </h2>
        <p
          className="text-lg z-40 mt-2 w-full items-center justify-center px-10 text-center text-2xl text-slate-100 
         sm:px-3 sm:text-2xl"
        >
          {translations.subtitle}
        </p>
      </section>
    </>
  )
}
