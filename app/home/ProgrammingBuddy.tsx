import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProgrammingBuddy() {
  const router = useRouter()
  return (
    <div className="w-screen">
      <div className={`my-10 mt-16 flex flex-col items-center justify-center`}>
        <p className="mb-4 text-center text-5xl font-semibold tracking-tight text-white">
          Your pair programming that never sleeps
        </p>
        <p className="mb-12 mt-3 px-4 text-center text-2xl uppercase text-celeste">
          {`Work closely with your best friend when it comes to code`}
        </p>
        <div
          className="grid h-auto w-[90%] grid-cols-1
      rounded-xl bg-gradient-to-b from-[#A486FF] to-[#6530FC] p-4 sm:h-[451px]
      sm:w-[1050px] sm:grid-cols-2 sm:p-0"
        >
          <div
            id="col-1"
            className="flex justify-center sm:ml-20 sm:w-[500px] sm:justify-start"
          >
            <Image
              className="my-12"
              src="/home/chat-combo.svg"
              width={352}
              height={300}
              title="Chat Combo"
              alt="Chat combo"
            />
          </div>
          <div id="col-2" className="relative sm:ml-12 sm:mt-20 sm:w-[500px]">
            <h3 className="text-left text-5xl font-semibold leading-tight text-white ">
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
        </div>
      </div>
    </div>
  )
}
