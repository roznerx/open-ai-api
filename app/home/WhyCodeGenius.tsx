// import { useScroll, useTransform } from "framer-motion"

export default function ProgrammingBuddy() {
  // let { scrollYProgress } = useScroll()
  // let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <>
      {/* <motion.div
        style={{ y }}
        className="absolute inset-0 top-96 before:absolute before:inset-0 before:block before:h-full before:w-full before:rounded-full before:bg-gradient-to-br before:from-secondaryPurple/30 before:to-secondaryPurple/90 before:blur-[120px] before:content-[''] md:mx-auto md:h-[350px] md:w-[750px] lg:flex"
      ></motion.div> */}
      <div className="mx-auto mt-20 flex w-screen flex-col items-center justify-center">
        <p className="text-2xl font-semibold text-mint">
          SEE WHY YOU SHOULD TRY CODE GENIUS
        </p>
        <p className="text-center text-4xl font-semibold text-white">
          Get better and more efficient unit tests
        </p>
        <div className="w-screen">
          <div
            className={`m-4 mx-auto mt-10 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 sm:w-[80%] sm:grid-cols-2 sm:place-items-center`}
          >
            <div
              className="flex h-[444px] w-[100%] flex-col items-center justify-center rounded-xl 
              bg-gradient-to-b from-mint 
      to-black sm:w-[505px] sm:bg-gradient-to-b"
            >
              <p className="text-center text-4xl font-semibold text-white">
                Go from this
              </p>
            </div>
            <div
              className="mt-12 flex h-[444px] w-[100%] flex-col items-center justify-center rounded-xl bg-gradient-to-t from-mint  to-black
      sm:mt-0 sm:w-[505px] sm:bg-gradient-to-b"
            >
              <p className="text-center text-4xl font-semibold text-white">
                To this
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
