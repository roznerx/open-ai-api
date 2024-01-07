import Image from "next/image"

export default function CodeFaster() {
  return (
    <div
      className={`mx-auto mt-12 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 gap-y-8 sm:w-[75%] sm:grid-cols-2 sm:place-items-center`}
    >
      <h2 className="mx-auto text-center text-4xl text-white">
        Save your time for creating more features
      </h2>
      <div
        className="group relative flex h-[444px] w-[100%] cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#A486FF] to-[#6530FC]
       sm:w-[505px] sm:bg-gradient-to-t"
      >
        <Image
          src="/icons/rayo-gradient.svg"
          className="h-64 w-64 transition duration-200 group-hover:scale-150"
          alt="rayo"
          width={196}
          height={163}
        />
        {/* <p className="w-[80%] text-center text-4xl font-semibold leading-tight text-white">
              Create unit tests in seconds
            </p> */}
      </div>

      <div
        className="group relative mt-12 flex h-[444px] w-[100%] cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-t from-[#6530FC] to-[#A486FF]
      sm:mt-0 sm:w-[505px] sm:bg-gradient-to-t"
      >
        <Image
          src="/icons/code-fast.svg"
          className="mt-5 h-64 w-64 transition duration-200 group-hover:scale-150"
          alt="camera"
          width={196}
          height={163}
        />
        {/* <p className=" mx-auto w-[80%] text-center text-4xl font-semibold leading-tight text-white">
            Create efficient code in seconds
          </p> */}
      </div>
      <h2 className="mx-auto text-center text-4xl leading-tight text-white">
        Code faster and efficient
      </h2>
    </div>
  )
}
