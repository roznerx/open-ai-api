import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProgrammingBuddy() {
  const router = useRouter()
  return (
    <div className="w-screen">
      <div className={`my-10 mt-16 flex flex-col items-center justify-center`}>
        <p className="mb-20 text-center text-5xl font-semibold text-white">
          Your pair programming that never sleeps
        </p>
        <div
          className="grid h-auto w-[90%] grid-cols-1
      rounded-xl bg-gradient-to-b from-[#A486FF] to-[#6530FC] p-4 sm:h-[451px]
      sm:w-[1050px] sm:grid-cols-2 sm:p-0"
        >
          <div id="col-1" className="sm:ml-12 sm:mt-24 sm:w-[500px]">
            <h3 className="text-center text-5xl font-semibold leading-tight text-white sm:text-left">
              Chat with your AI programming buddy
            </h3>
            <p className="mt-6 text-2xl  leading-tight text-white">
              Code Genius will help you at any stage of your development
              process.
            </p>
            <div
              onClick={() => router.push("/pricing")}
              className="w-[250px] cursor-pointer rounded-lg bg-black"
            >
              <p className="mt-8 py-4 text-center font-semibold  text-white">
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
    </div>
  )
}
