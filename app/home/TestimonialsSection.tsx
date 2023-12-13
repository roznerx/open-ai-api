import Testimonial from "./Testimonial"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"

import { Navigation, Pagination, Autoplay, Virtual } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import useWindowSize from "hooks/use-window-size"

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual])

export default function TestimonialsSection() {
  const slides: React.ReactNode[] = [] // Define the type of slides as ReactNode[]
  const { isMobile } = useWindowSize()
  for (let i = 0; i < 12; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} style={{ listStyle: "none" }}>
        <div className="slide flex justify-center">
          <Testimonial />
        </div>
      </SwiperSlide>,
    )
  }

  return (
    <div className="my-10 w-screen">
      <h5 className="mt-10 flex justify-center text-4xl text-white ">
        Loved by developers
      </h5>
      <p className="mt-5 flex justify-center text-center text-2xl text-gray-100">
        Our users save 35% of development time every day they use Code Genius
      </p>
      <div className="mx-auto flex w-full overflow-hidden sm:w-[90%]">
        <Swiper
          id="swiper"
          virtual
          slidesPerView={isMobile ? 1 : 4}
          spaceBetween={30}
          autoplay
          loop
          onReachEnd={() => {
            const tmp = slides.unshift()
            slides.push(tmp)
          }}
        >
          {slides}
        </Swiper>
      </div>
    </div>
  )
}
