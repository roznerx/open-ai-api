import Testimonial from "./Testimonial"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"

import { Navigation, Pagination, Autoplay, Virtual } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import useWindowSize from "hooks/use-window-size"

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual])

const testimonials = [
  {
    author: "Paul Smith",
    review: "Really enjoyed using the product, very user friendly.",
  },
  {
    author: "Pablo Ochoa",
    review: "Creating a unit test for my components feels like pure magic.",
  },
  {
    author: "Jasper Chen",
    review: "Code Genius allows you to make your creativity a reality.",
  },
  {
    author: "Fede Sanchez",
    review:
      "I've been utilizing Code Genius and it has proven to be incredibly valuable.",
  },
  {
    author: "Cesar Vin",
    review:
      "Amazing a app, this week my productivity is fire! Now I'm a Code Genius!",
  },
  {
    author: "Esteban Puentes",
    review:
      "Amazing and very useful app. It's a true user friendly experience.",
  },
  {
    author: "Cesar Vin",
    review:
      "Amazing a app, this week my productivity is fire! Now I'm a Code Genius!",
  },
  {
    author: "Esteban Puentes",
    review:
      "Amazing and very useful app. It's a true user friendly experience.",
  },
]

export default function TestimonialsSection() {
  const slides: React.ReactNode[] = [] // Define the type of slides as ReactNode[]
  const { isMobile } = useWindowSize()
  testimonials.map((testimonial, i) => {
    slides.push(
      <SwiperSlide key={`slide-${i}`} style={{ listStyle: "none" }}>
        <div className="slide flex justify-center">
          <Testimonial testimonial={testimonial} />
        </div>
      </SwiperSlide>,
    )
  })

  return (
    <div className="my-10 w-screen">
      <h5 className="mt-10 flex justify-center text-4xl text-white ">
        Loved by developers around the world
      </h5>
      <p className="mt-5 flex justify-center px-4 text-center text-2xl text-gray-100">
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
