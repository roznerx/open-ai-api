import Image from "next/image"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type CardProps = {
  title: string
  text?: string
  width?: string
  size?: "large" | "small"
  hasScale?: boolean
  isChat?: boolean
  isSub?: boolean
  isLeetCode?: boolean
  mb?: string
  category?: string
  difficulty?: string
  order?: string
  button?: ReactNode
  pill?: ReactNode
  imageSrc?: any
  onClick?: (text: string) => void
}
export function PromptCard({
  hasScale,
  isChat = false,
  isSub = false,
  isLeetCode = false,
  category,
  difficulty,
  title,
  button,
  pill,
  order = "",
  imageSrc,
  text,
  onClick,
  size,
}: CardProps) {
  const altImg = imageSrc?.split("/")[2].split(".")[0]

  return (
    <div
      className={`${order} relative flex cursor-pointer ${
        size === "large"
          ? "my-1 h-auto w-[90%] flex-col items-start justify-start sm:col-span-2 sm:h-56 sm:w-full"
          : "my-1 h-auto w-[90%] sm:h-52 sm:w-[280px] sm:items-start"
      }  cursor-default rounded-lg border-[1px] border-purple-500 bg-purple-700 p-6 shadow `}
      onClick={() => {
        if (onClick && text) onClick(text)
      }}
    >
      <div className="relative mx-auto w-full sm:max-w-lg">
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
            className={`text-left text-2xl font-bold tracking-tight text-white sm:mt-0`}
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
          {pill && pill}
          {isSub && (
            <div className="ml-4 sm:absolute sm:-right-3">
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
        {text && !isLeetCode && (
          <p className={`text-sm pt-2 font-normal text-gray-200`}>{text}</p>
        )}
        {isLeetCode && (
          <div className="mt-4">
            {category && (
              <p className={`text-sm pt-2 font-normal text-gray-200`}>
                Category: <span className="text-celeste">{category}</span>
              </p>
            )}
            {difficulty && (
              <p className={`text-sm pt-2 font-normal text-gray-200`}>
                Difficulty:{" "}
                <span className="text-orange-300">{difficulty}</span>
              </p>
            )}
          </div>
        )}
      </div>
      {button && (
        <div className="relative mx-auto items-center justify-center sm:absolute sm:bottom-1 sm:right-4">
          {button}
        </div>
      )}
    </div>
  )
}
