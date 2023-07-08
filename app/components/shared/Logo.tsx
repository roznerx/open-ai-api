import Image from "next/image"

export default function Logo() {
  return (
    <div className="mx-auto mt-3 flex">
      <Image
        src={"/logo/code-genius.svg"}
        width={32}
        height={32}
        loading="eager"
        className={"right-8"}
        alt="Code Genius"
      />
      <h1
        className={`text-lg sm:text-xl sm:text-xl mt-1 ml-2
        bg-gradient-to-r from-[#A1FFE0] to-[#2C9DC0] bg-clip-text font-sans text-2xl font-bold tracking-tight text-transparent  sm:leading-6`}
      >
        Code Genius
      </h1>
    </div>
  )
}
