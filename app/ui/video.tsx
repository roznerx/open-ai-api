"use client"

import Tilt from "react-parallax-tilt"

export default function Video({
  poster,
  videoSrc,
  className,
  noTilt,
}: {
  videoSrc: string
  poster: string
  className?: string
  noTilt?: boolean
}) {
  if (!videoSrc) {
    return (
      <div
        className={`${className} prose text-sm flex h-[20rem] break-inside-avoid items-center justify-center rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 text-center backdrop-blur-lg backdrop-filter`}
      >
        There was an error loading this video.
      </div>
    )
  }

  const VideoBody = (
    <div
      className={`${
        noTilt ? className : ""
      } not-prose break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter`}
    >
      <div className="my-3">
        {videoSrc && (
          <video
            className="rounded-lg border border-gray-200 drop-shadow-sm"
            poster={poster}
            loop
            autoPlay
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  )

  return noTilt ? (
    VideoBody
  ) : (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      className={className}
    >
      {VideoBody}
    </Tilt>
  )
}
