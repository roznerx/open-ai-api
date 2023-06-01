import Image from "next/image"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import useWindowSize from "hooks/use-window-size"

type CardProps = {
  title: string
  text: string
  width?: string
  size?: "large" | "small"
  hasScale?: boolean
  mb?: string
  order?: string
  button?: ReactNode
  imageSrc?: string //react ReactNode
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
  const { isMobile } = useWindowSize()
  const cardWidth = isMobile ? "w-[100%]" : "w-[47%]"
  return (
    <div
      className={`${order} mt-4 flex ${
        size === "large"
          ? cardWidth + " h-48"
          : "h-38 w-[100%] sm:h-56 sm:w-[23%]"
      } 
      cursor-pointer justify-between rounded-lg border-[1px] border-purple-500 bg-purple-700 p-6 shadow hover:bg-purple-500`}
      onClick={() => {
        if (onClick) onClick(text)
      }}
    >
      <div className="mx-auto w-full">
        <motion.div
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
              alt="Dashboard"
              src={imageSrc}
              width={40}
              height={40}
              className="mb-2"
            />
          )}
        </motion.div>
        <h5 className="mb-1 text-left text-2xl font-bold tracking-tight text-white">
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
