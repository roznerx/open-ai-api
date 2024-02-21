"use client"

export default function SuperHero({ translations }) {
  return (
    <>
      <section>
        <h2 className="z-40 items-center justify-center px-3 text-center text-5xl font-extrabold tracking-tight text-slate-200 sm:flex sm:w-[770px] sm:text-6xl">
          {translations.title}
        </h2>
      </section>
    </>
  )
}
