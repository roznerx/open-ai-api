import Testimonial from "./Testimonial"

export default function TestimonialsSection() {
  const testimonials = Array.from({ length: 5 }, (_, index) => index + 1)

  return (
    <div className="my-10 flex w-screen overflow-hidden">
      {testimonials.map((item) => {
        return <Testimonial key={item} />
      })}
    </div>
  )
}
