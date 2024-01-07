import Image from "next/image"
import CurveArrow from "./CurveArrow"

export default function GoFromThis() {
  return (
    <>
      <div className="relative mx-auto mt-20 flex w-screen flex-col items-center justify-center">
        <p className=" text-center text-5xl font-semibold text-white">
          Get better and more efficient unit tests
        </p>
        <p className="mt-6 text-2xl  text-celeste">
          SEE WHY YOU SHOULD TRY CODE GENIUS PREMIUM FEATURES
        </p>
        <CurveArrow />
        <p className="absolute top-[250px] text-[18px] italic text-white">
          in seconds
        </p>
        <div className="w-screen">
          <div className="mx-auto flex justify-evenly">
            <p className="mt-8 text-3xl font-semibold text-white">
              Go from this <br />
              component
            </p>
            <p className="mt-8 text-3xl font-semibold text-white">
              To this <br /> unit test
            </p>
          </div>

          <div
            className={`group mx-auto mt-12 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 sm:w-[75%] sm:grid-cols-2 sm:place-items-center`}
          >
            <div
              className="group flex h-[444px] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] 
            to-[#B1EAF1] sm:w-[500px]"
            >
              <Image
                className="duration-30-0 cursor-pointer transition hover:border-2 group-hover:scale-150 group-hover:rounded-xl group-hover:border-white"
                src="/home/from-this.svg"
                alt="Go from this component"
                width={406}
                height={283}
              />
            </div>
            <div
              className="sm:mt0 mt-12 flex h-[444px] flex-col items-center justify-center rounded-xl
               bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] sm:mt-0
       sm:w-[505px] "
            >
              <Image
                className="cursor-pointer transition duration-300 hover:scale-150 hover:rounded-xl hover:border-2 hover:border-white"
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
