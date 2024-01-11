import Image from "next/image"
import Tilt from "react-parallax-tilt"
import { useRouter } from "next/navigation"

export default function ProgrammingBuddy({ translations }) {
  const router = useRouter()
  return (
    <div className="w-screen">
      <div className={`my-10 mt-16 flex flex-col items-center justify-center`}>
        <p className="mb-4 max-w-5xl text-center text-5xl leading-normal text-white">
          {translations.title}
        </p>
        <p className="mb-12 mt-3 max-w-5xl px-4 text-center text-2xl font-semibold uppercase leading-normal tracking-normal text-celeste">
          {translations.subtitle}
        </p>
        <div
          className="grid h-auto w-[90%] grid-cols-1
      rounded-[35px] bg-gradient-to-b from-[#A486FF] to-[#6530FC] p-4 sm:h-[451px]
      sm:w-[1050px] sm:grid-cols-2 sm:p-0"
        >
          <div
            id="col-1"
            className="flex justify-center sm:ml-20 sm:w-[500px] sm:justify-start"
          >
            <Tilt
              glareEnable={false}
              glareMaxOpacity={0}
              glareColor="#cecece"
              glarePosition="all"
              glareBorderRadius="0px"
              tiltMaxAngleX={60}
              tiltMaxAngleY={60}
            >
              <Image
                className="mt-20 -rotate-[7.5deg]"
                src="/home/chat-combo.svg"
                width={352}
                height={300}
                title="Chat Combo"
                alt="Chat combo"
              />
            </Tilt>
          </div>
          <div
            id="col-2"
            className="relative pr-12 sm:ml-12 sm:mt-16 sm:w-[500px]"
          >
            <h3 className="pr-12 text-left text-4xl font-bold leading-tight text-white">
              {translations.bannerTitle}
            </h3>
            <p className="mt-6 text-2xl  text-white">
              {translations.bannerSubTitle}
            </p>
            <div
              onClick={() => router.push("/pricing")}
              className="w-[200px] cursor-pointer rounded-lg bg-black"
            >
              <p className="mt-8 py-4 text-center font-semibold text-white hover:text-gray-200">
                {translations.cta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
