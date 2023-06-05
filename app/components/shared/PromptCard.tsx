import Image from "next/image"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type CardProps = {
  title: string
  text: string
  width?: string
  size?: "large" | "small"
  hasScale?: boolean
  mb?: string
  order?: string
  button?: ReactNode
  imageSrc?: any
  onClick?: (text: string) => void
}
export default function PromptCard({
  hasScale,
  title,
  button,
  order = "",
  imageSrc,
  text,
  onClick,
  size,
}: CardProps) {
  const altImg = imageSrc.split("/")[2].split(".")[0]

  return (
    <div
      className={`${order} relative flex ${
        size === "large"
          ? "h-56 w-[80%] sm:col-span-2 sm:w-full"
          : "h-38 w-[80%] sm:h-52 sm:w-[250px]"
      } 
      cursor-pointer items-center justify-center rounded-lg border-[1px] border-purple-500 bg-purple-700 p-6 shadow hover:bg-purple-500`}
      onClick={() => {
        if (onClick) onClick(text)
      }}
    >
      <div className="mx-auto w-full">
        <motion.div
          className="absolute top-2 left-4"
          initial={{ scale: 0 }}
          animate={{
            scale: hasScale ? 1 : 0,
            transitionEnd: {
              scale: 1,
            },
          }}
        >
          {imageSrc && (
            <Image
              title={altImg}
              alt={altImg}
              src={imageSrc}
              width={40}
              height={40}
              className="mb-2"
            />
          )}
        </motion.div>
        <h5
          className={`mt-4 text-left text-2xl font-bold tracking-tight text-white`}
        >
          {title}
        </h5>
        <p className="text-sm pt-2 text-left font-normal text-gray-200">
          {text}
        </p>
      </div>
      {button && <div className="my-auto">{button}</div>}
    </div>
  )
}
