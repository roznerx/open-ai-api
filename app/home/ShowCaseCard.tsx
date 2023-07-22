"use client"
type ShowCaseCardProps = {
  image?: any
  title: string
  description?: string
  buttonText?: string
  button?: ReactNode
  videoSrc?: string
}

import Button from "app/components/Button"
import { ReactNode, useEffect } from "react"
import { requestFullscreen } from "utils"

export default function ShowCaseCard({
  title,
  description,
  buttonText,
  videoSrc,
  image,
}: ShowCaseCardProps) {
  useEffect(() => {
    const video = document.getElementById("codevspilot") as HTMLVideoElement
    video.addEventListener("ended", function () {
      video.load()
    })
  }, [])
  return (
    <div className="group relative my-14 sm:my-20">
      <div className="absolute inset-1 mx-auto w-[82%] animate-tilt rounded-lg bg-gradient-to-r from-mint/60 to-blue/60 opacity-75 blur-2xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
      <div className="relative mx-auto flex h-auto w-[90%] cursor-pointer items-center rounded-3xl bg-purple-700 p-6 text-center font-sans shadow-xl outline-none focus-visible:ring-2 sm:min-h-[404px] sm:w-[80%] md:h-[5.625rem]">
        <div className="flex w-full flex-col pr-2 sm:flex-row">
          <div className="w-full">
            <h3 className="absolute top-8 mx-auto mb-8 flex w-[90%] items-center justify-center bg-gradient-to-r from-mint to-blue bg-clip-text p-2 text-center text-4xl font-bold leading-[44px] text-transparent sm:ml-0 sm:w-full sm:pl-3 sm:text-5xl">
              {title}
            </h3>
            <p className="mx-2 mt-28 p-2 pt-10 text-center text-2xl text-gray-200 sm:mt-20 sm:pt-4 sm:text-left sm:text-3xl">
              {description}
            </p>
            {buttonText && (
              <div className="ml-4 mt-8 flex justify-center sm:items-start sm:justify-start">
                <Button
                  buttonTextColor="dark"
                  variant="mint"
                  loading={false}
                  text={buttonText}
                  onClick={() => {
                    const video = document.getElementById(
                      "codevspilot",
                    ) as HTMLVideoElement
                    if (video) {
                      video.play()
                      video.addEventListener("playing", function () {
                        requestFullscreen(video)
                      })
                    }
                  }}
                />
              </div>
            )}
          </div>
          {videoSrc && (
            <video
              id="codevspilot"
              className="mx-auto mr-6 mt-12 rounded-lg sm:mt-20"
              width="400"
              height="321"
              poster="static/codevspilot.svg"
              controls
            >
              <source src={videoSrc} type="video/mp4"></source>
            </video>
          )}
          {image && (
            <div className="mr-6 hidden  sm:absolute sm:right-40 sm:mb-20 sm:block">
              {image}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
