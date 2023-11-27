import Image from "next/image"

export default function ProgrammingBuddy() {
  return (
    <div className="w-screen">
      <div className={`my-10 mt-16 flex items-center justify-center`}>
        <div
          className="grid h-auto w-[90%] grid-cols-1
      rounded-xl bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] p-4 sm:h-[451px]
      sm:w-[80%] sm:grid-cols-2 sm:p-0"
        >
          <div id="col-1" className="sm:ml-12 sm:mt-24 sm:w-[500px]">
            <h3 className="text-5xl font-semibold leading-tight">
              Chat with your AI programming buddy
            </h3>
            <p className="mt-6 text-2xl font-normal">
              Code Genius will help you at any stage of your development
              process.
            </p>
            <div className="w-[250px] rounded-lg bg-black">
              <p className="mt-8 py-4 text-center font-semibold text-white">
                Start your free trial
              </p>
            </div>
          </div>
          <div id="col-2" className="hidden items-end overflow-hidden sm:flex">
            <div className="h-[370px] ">
              <Image
                src="/home/code-img.png"
                width={680}
                height={530}
                alt="code editor"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Tile section begins */}
      <div
        className={`m-4 mx-auto mt-10 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 sm:w-[80%] sm:grid-cols-2 sm:place-items-center`}
      >
        <div
          className="flex h-[444px] w-[100%] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#B095FF] via-[#8ABFE5]
      to-[#B1EAF1] sm:w-[505px] sm:bg-gradient-to-t"
        >
          <Image
            src="/home/camera.svg"
            className="mt-12 h-64 w-64"
            alt="camera"
            width={196}
            height={163}
          />
          <p className="text-center text-4xl font-semibold text-white">
            Create unit tests in seconds
          </p>
        </div>
        <div
          className="mt-12 flex h-[444px] w-[100%] flex-col items-center justify-center rounded-xl bg-gradient-to-t from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1]
      sm:mt-0 sm:w-[505px] sm:bg-gradient-to-t"
        >
          <Image
            src="/home/camera.svg"
            className="mt-12 h-64 w-64"
            alt="camera"
            width={196}
            height={163}
          />
          <p className="text-center text-4xl font-semibold text-white">
            Create unit tests in seconds
          </p>
        </div>
      </div>
    </div>
  )
}
