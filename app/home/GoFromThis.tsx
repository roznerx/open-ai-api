import Image from "next/image"
import CurveArrow from "./CurveArrow"

export default function GoFromThis({ translations }) {
  return (
    <>
      <div className="relative mx-auto mt-32 flex w-screen flex-col items-center justify-center">
        <p className=" text-center text-5xl font-semibold text-white">
          {translations.title}
        </p>
        <p className="mb-8 mt-6 px-4 text-center text-2xl text-celeste">
          {translations.subtitle}
        </p>
        <CurveArrow />
        <div className="w-screen">
          <div className="mx-auto flex justify-evenly">
            <p className="mt-8 text-3xl font-semibold text-white">
              {translations.fromThis}
            </p>
            <p className="mr-8 mt-8 pr-8 text-3xl font-semibold text-white">
              {translations.toThis}
            </p>
          </div>

          <div
            className={`mx-auto mt-12 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 sm:w-[1100px] sm:grid-cols-2 sm:place-items-center`}
          >
            <div
              className="flex h-[444px] w-full flex-col items-center justify-center rounded-[35px] bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] 
            to-[#B1EAF1] sm:w-[500px]"
            >
              <Image
                className="scale-100 cursor-pointer duration-300 ease-in hover:scale-[1.15]"
                src="/home/from-this.svg"
                alt="Go from this component"
                width={406}
                height={283}
              />
            </div>
            <div
              className="mt-12 flex h-[444px] w-full flex-col items-center justify-center rounded-[35px]
               bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] sm:mt-0
       sm:w-[505px] "
            >
              <Image
                className="scale-100 cursor-pointer duration-300 ease-in hover:scale-[1.15]"
                src="/home/to-this.svg"
                alt="To this unit test"
                width={406}
                height={337}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
