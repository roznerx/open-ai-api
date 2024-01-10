import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SyncYourFlow() {
  const router = useRouter()
  return (
    <div className="mx-auto my-32 w-screen">
      <h5 className="flex justify-center px-4 text-center text-5xl text-white">
        Stay in sync with your workflow
      </h5>
      <p className="my-4 mb-10 mt-5 flex justify-center px-4 text-center text-2xl uppercase text-celeste">
        BONUS GITHUB APP TO SYNC WITH YOUR WORKFLOW
      </p>
      {/* <p className="mt-5 flex justify-center text-center text-2xl text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p> */}
      <div
        className="mx-auto flex h-auto w-[90%] grid-cols-1 flex-col justify-center rounded-xl bg-gradient-to-b
        from-[#A486FF] to-[#6530FC] p-4 font-semibold sm:grid sm:h-[451px]
      sm:w-[1050px] sm:grid-cols-2 sm:p-0"
      >
        <div
          id="col-1"
          className="w-full sm:relative sm:ml-12 sm:mt-5 sm:w-[650px]"
        >
          <Image
            className="mx-auto mt-6 object-center"
            src="/home/github1.webp"
            width={380}
            height={270}
            alt="Generated unit test on the flight"
          />
        </div>
        <div id="col-2" className="sm:ml-12 sm:mt-24 sm:w-[500px]">
          <h3 className="text-left text-5xl font-semibold leading-tight text-white sm:text-left">
            Get our Github App <br /> for pro members
          </h3>
          <p className="mt-6 text-2xl  leading-tight text-white">
            Empower your workflow with Code Genius Code Coverage and get unit
            tests on the fly
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
  )
}
