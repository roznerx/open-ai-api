import Image from "next/image"

import { useRouter } from "next/navigation"

export default function ProgrammingBuddy({ translations }) {
  const router = useRouter()
  return (
    <div className="w-screen">
      <div className={`flex flex-col items-center justify-center pt-16`}>
        <h2 className="mb-4 w-full text-center text-4xl leading-tight text-slate-200 sm:text-5xl">
          {translations.title}
        </h2>
        <p className="mb-12 mt-3 w-full px-4 text-center text-2xl font-normal leading-tight  text-slate-300">
          {translations.subtitle}
        </p>
        <div
          className="grid h-auto w-[90%] grid-cols-1
      rounded-[35px] bg-gradient-to-b from-[#A486FF] to-[#6530FC] p-4 sm:h-auto
      sm:w-[1050px] sm:grid-cols-2 sm:p-0"
        >
          <div
            id="col-1"
            className="my-8 flex h-auto items-center justify-center sm:my-0"
          >
            <Image
              className="-rotate-[7.5deg] cursor-pointer hover:-scale-x-100 hover:transform"
              src="/home/chat-combo.svg"
              width={352}
              height={300}
              title="Chat Combo"
              alt="Chat combo"
            />
          </div>
          <div
            id="col-2"
            className="relative w-full sm:ml-0 sm:mr-20 sm:mt-12 sm:w-[560px]"
          >
            <h3 className="text-center text-4xl font-bold leading-tight text-slate-100 sm:pr-12 sm:text-left">
              {translations.bannerTitle}
            </h3>
            <p className="mt-6 max-w-lg px-4 text-center text-1xl leading-tight text-slate-100 sm:px-0 sm:text-left">
              {translations.bannerSubTitle}
            </p>
            <div className="flex justify-center sm:justify-start">
              <div
                onClick={() => router.push("/pricing")}
                className="my-6 w-[250px] cursor-pointer rounded-lg bg-black"
              >
                <p className="py-2 text-center text-1xl text-white hover:text-gray-200">
                  {translations.cta}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
