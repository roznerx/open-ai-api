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
          <span className="relative">
            <span className="absolute left-2 top-1 ml-2 inline-flex sm:top-0">
              <span className="absolute top-0 sm:relative sm:top-0">
                <span className="absolute -top-2 right-[2px] text-[10px] text-mint">
                  ✦
                </span>
                <span className="text-[12px] text-mint">✦</span>
                <span className="absolute bottom-2 left-2 text-[16px] text-mint">
                  ✦
                </span>
              </span>
            </span>
          </span>
        </p>
      </section>
    </>
  )
}
