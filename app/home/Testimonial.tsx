import Avvvatars from "avvvatars-react"

export default function Testimonial({ testimonial }) {
  return (
    <div className="mx-0 mt-16 flex w-[90%] max-w-full items-start gap-4 self-center rounded-lg border border-[#404040] bg-purple-800 p-4 shadow-sm max-md:mt-10 sm:w-80">
      <Avvvatars
        borderColor="6530FC"
        value={`${testimonial.author}@gmail.com`}
      />
      <div className="flex w-full grow basis-[0%] flex-col items-stretch self-stretch sm:w-[80%]">
        <div className="text-sm whitespace-nowrap font-semibold leading-5 text-white">
          {testimonial.author}
        </div>
        <div className="text-sm mt-1 h-16 overflow-hidden leading-5 text-zinc-100">
          {testimonial.review}
        </div>
        <div className="mt-1 flex items-stretch justify-between gap-1">
          <div className="text-xs inline-flex leading-4 text-white">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c27d6f5-b3bb-45e7-aeb3-5341ada6c3c8?apiKey=b2904e2cffe74a0589d92ce94af4899c&"
              className="aspect-square w-4 max-w-full shrink-0 overflow-hidden object-contain object-center pt-1"
            />
            <span className="ml-3 mt-2">December 2021</span>
          </div>
        </div>
      </div>
    </div>
  )
}
