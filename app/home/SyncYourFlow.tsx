import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SyncYourFlow() {
  const router = useRouter()
  return (
    <div className="mx-auto my-20 w-screen">
      <h5 className="flex justify-center text-5xl text-white">
        Stay in sync with your workflow
      </h5>
      <p className="my-4 mb-10 mt-5 flex justify-center text-center text-2xl uppercase text-celeste">
        BONUS GITHUB APP TO SYNC WITH YOUR WORKFLOW
      </p>
      {/* <p className="mt-5 flex justify-center text-center text-2xl text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p> */}
      <div
        className="mx-auto grid h-auto w-[90%] grid-cols-1 rounded-xl
      bg-gradient-to-b from-[#B095FF] via-[#8ABFE5] to-[#B1EAF1] p-4 font-semibold sm:h-[451px]
      sm:w-[72%] sm:grid-cols-2 sm:p-0"
      >
        <div id="col-1" className="sm:ml-12 sm:mt-16 sm:w-[500px]">
          <h3 className="text-center text-5xl font-semibold leading-tight text-white sm:text-left">
            Github App for <br /> Pro members
          </h3>
          <p className="mt-6 w-[400px] text-2xl font-bold leading-tight">
            Empower your workflow with Code Genius Code Coverage. Get unit tests
            on the fly and save time with our AI-powered GitHub App, generating
            tests at PR time.
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
          <div className="h-[370px]">
            <Image
              src="/home/github.jpeg"
              width={480}
              height={270}
              alt="Generated unit test on the flight"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
