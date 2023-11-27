export default function Testimonial() {
  return (
    <div className="mx-2 mt-16 flex w-80 max-w-full items-start gap-4 self-center rounded-md border border-solid bg-neutral-900 p-4 shadow-sm max-md:mt-10">
      <div className="flex h-10 w-10 shrink-0 flex-col rounded-[50%] bg-violet-400" />
      <div className="flex w-[80%] grow basis-[0%] flex-col items-stretch self-stretch">
        <div className="text-sm whitespace-nowrap font-semibold leading-5 text-white">
          @nextjs
        </div>
        <div className="text-sm mt-1 overflow-hidden leading-5 text-zinc-100">
          The React Framework - created and maintained by @vercel
        </div>
        <div className="mt-1 flex items-stretch justify-between gap-1">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c27d6f5-b3bb-45e7-aeb3-5341ada6c3c8?apiKey=b2904e2cffe74a0589d92ce94af4899c&"
            className="aspect-square w-4 max-w-full shrink-0 overflow-hidden object-contain object-center"
          />
          <div className="text-xs w-60 leading-4 text-white">
            Joined December 2021
          </div>
        </div>
      </div>
    </div>
  )
}
