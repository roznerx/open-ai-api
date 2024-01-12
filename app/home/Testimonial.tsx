/* eslint-disable @next/next/no-img-element */
import Avvvatars from "avvvatars-react"

export default function Testimonial({ testimonial }) {
  const nameParts = testimonial?.author?.split(" ")
  const name = nameParts[0].substring(0, 1)
  const lastName = nameParts[1].substring(0, 1)

  return (
    <div className="mx-0 mt-16 flex w-[90%] max-w-full items-start gap-4 self-center rounded-lg border border-violet-500 bg-violet-800 p-4 shadow-sm max-md:mt-10 sm:w-80">
      <Avvvatars borderColor="6530FC" value={`${name}${lastName}`} />
      <div className="flex w-full grow basis-[0%] flex-col items-stretch self-stretch sm:w-[80%]">
        <div className="text-sm mt-1 whitespace-nowrap font-semibold leading-5 text-white">
          {testimonial.author}
        </div>
        <div className="text-sm mt-1 h-16 overflow-hidden leading-5 text-zinc-100">
          {testimonial.review}
        </div>
        <div className="mt-1 flex items-stretch justify-between gap-1">
          <div className="text-xs inline-flex leading-4 text-white">
            <img
              alt="calendar"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c27d6f5-b3bb-45e7-aeb3-5341ada6c3c8?apiKey=b2904e2cffe74a0589d92ce94af4899c&"
              className="aspect-square w-4 max-w-full shrink-0 overflow-hidden object-contain object-center pt-1"
            />
            <span className="ml-3 mt-2">{testimonial.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
