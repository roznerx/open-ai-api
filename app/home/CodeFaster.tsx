import Image from "next/image"
import Tilt from "react-parallax-tilt"

export default function CodeFaster({ translations }) {
  return (
    <div
      className={`mx-auto mt-12 grid w-[90%] grid-cols-1 flex-col place-items-start gap-x-0 gap-y-8 sm:w-[1100px] sm:grid-cols-2 sm:place-items-center`}
    >
      <div
        className="group relative flex h-[444px] w-[100%] cursor-pointer flex-col items-center justify-center rounded-[35px] bg-gradient-to-t from-[#6530FC] to-[#A486FF]
       sm:w-[505px] sm:bg-gradient-to-t"
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
            src="/icons/cloud.svg"
            className="h-60 w-60"
            alt="rayo"
            width={196}
            height={163}
          />
        </Tilt>
        <p className="mt-4 w-full max-w-xs text-center text-3xl font-semibold leading-tight text-white">
          {translations.cloud}
        </p>
      </div>

      <div
        className="relative mt-5 flex h-auto min-h-[444px] w-[100%] cursor-pointer flex-col items-center justify-center rounded-[35px] bg-gradient-to-t from-[#6530FC] to-[#A486FF]
      sm:mt-0 sm:w-[505px] sm:bg-gradient-to-t"
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
            src="/icons/layers1.svg"
            className="mt-5 h-56 w-56"
            alt="camera"
            width={196}
            height={163}
          />
        </Tilt>
        <p className="mx-auto mt-4 w-full max-w-xs text-center text-3xl font-semibold leading-tight text-white">
          {translations.layers}
        </p>
      </div>
    </div>
  )
}
