import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SyncYourFlow({ translations }) {
  const router = useRouter()
  return (
    <div className="mx-auto my-32 w-screen">
      <h5 className="flex justify-center px-4 text-center text-5xl text-white">
        {translations.title}
      </h5>
      <p className="my-4 mb-10 mt-5 flex justify-center px-4 text-center text-2xl uppercase text-celeste">
        {translations.subtitle}
      </p>

      <div
        className="mx-auto flex h-auto w-[90%] grid-cols-1 flex-col justify-center rounded-xl bg-gradient-to-b
        from-[#A486FF] to-[#6530FC] p-4 font-semibold sm:grid sm:h-[451px]
      sm:w-[1050px] sm:grid-cols-2 sm:p-0"
      >
        <div
          id="col-1"
          className="flex w-full justify-center sm:ml-2 sm:mt-5 sm:w-[650px] sm:justify-start"
        >
          <Image
            className="my-12 h-96 w-96 sm:my-0 sm:ml-12"
            src="/home/github1.svg"
            width={420}
            height={300}
            alt="Generated unit test on the flight"
          />
        </div>
        <div id="col-2" className="mr-6 sm:mt-12">
          <h3 className="max-w-[496px] text-left text-5xl font-semibold leading-tight text-white sm:text-left">
            {translations.bannerTitle}
          </h3>
          <p className="mt-6 text-2xl leading-tight text-white">
            {translations.bannerSubTitle}
          </p>
          <div
            onClick={() => router.push("/pricing")}
            className="w-[250px] cursor-pointer rounded-lg bg-black"
          >
            <p className="mt-8 py-4 text-center font-semibold text-white hover:text-gray-200">
              {translations.cta}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
