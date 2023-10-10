import Image from "next/image"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type CardProps = {
  title: string
  text: string
  width?: string
  size?: "large" | "small"
  hasScale?: boolean
  isChat?: boolean
  isSub?: boolean
  mb?: string
  order?: string
  button?: ReactNode
  imageSrc?: any
  onClick?: (text: string) => void
}
export function PromptCard({
  hasScale,
  isChat = false,
  isSub = false,
  title,
  button,
  order = "",
  imageSrc,
  text,
  onClick,
  size,
}: CardProps) {
  const altImg = imageSrc?.split("/")[2].split(".")[0]

  return (
    <div
      className={`${order} relative flex ${
        size === "large"
          ? "h-64 w-[80%] flex-col items-start justify-start sm:col-span-2 sm:h-56 sm:w-full"
          : "sm:h-38 h-auto w-[80%] sm:h-52 sm:w-[280px] sm:items-start"
      }  cursor-pointer rounded-lg border-[1px] border-purple-500 bg-purple-700 p-6 shadow hover:bg-purple-500`}
      onClick={() => {
        if (onClick) onClick(text)
      }}
    >
      <div className="mx-auto max-w-lg">
        <motion.div
          className={`absolute ${
            size !== "large"
              ? "top-2 "
              : "left-[140px] top-4 mx-auto sm:left-6 sm:top-8 sm:ml-40"
          }  `}
          initial={{ scale: 0 }}
          animate={{
            scale: hasScale ? 1 : 0,
            transitionEnd: {
              scale: 1,
            },
          }}
        ></motion.div>
        <div className="mb-2 flex w-full items-start justify-between sm:inline-flex sm:justify-start">
          <h5
            className={`text-2xl font-bold tracking-tight text-white sm:mt-0`}
          >
            {title}
          </h5>
          {!isChat && !isSub && imageSrc && (
            <Image
              title={altImg}
              alt={altImg}
              src={imageSrc}
              priority
              width={30}
              height={30}
              className="mb-2 ml-4"
            />
          )}
          {isChat && (
            <button className="ml-4 h-auto w-auto rounded-full bg-moradoCode p-1 px-2 text-[13px] font-semibold text-purple-900">
              New Feature
            </button>
          )}
          {isSub && (
            <div className="ml-4">
              <Image
                title={altImg}
                alt={altImg}
                src={imageSrc}
                priority
                width={30}
                height={30}
              />
            </div>
          )}
        </div>
        <p className={`text-sm pt-2 font-normal text-gray-200`}>{text}</p>
      </div>
      {button && <div className="absolute bottom-1 right-4">{button}</div>}
    </div>
  )
}
