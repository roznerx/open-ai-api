import CurveArrow from "./CurveArrow"

export default function GoFromThisToThis() {
  return (
    <>
      <div className="mx-auto mt-20 flex w-screen flex-col items-center justify-center">
        <p className="text-2xl font-semibold text-mint">
          SEE WHY YOU SHOULD TRY CODE GENIUS PREMIUM FEATURES
        </p>
        <p className="mt-6 text-center text-4xl font-semibold text-white">
          Get better and more efficient unit tests
        </p>
        <CurveArrow />
        <div className="w-screen">
          <div className="mx-auto flex justify-evenly">
            <p className="mt-8 text-3xl font-semibold text-white">
              Go from this
            </p>
            <p className="mt-8 text-3xl font-semibold text-white">To this</p>
          </div>

          <div
            className={`mx-auto mt-12 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 sm:w-[75%] sm:grid-cols-2 sm:place-items-center`}
          >
            <div
              className="flex h-[444px] flex-col items-center justify-center rounded-xl bg-gradient-to-b 
            from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] sm:w-[500px]"
            ></div>
            <div
              className="sm:mt0 mt-12 flex h-[444px] flex-col items-center justify-center rounded-xl
               bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] sm:mt-0
       sm:w-[505px] "
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
