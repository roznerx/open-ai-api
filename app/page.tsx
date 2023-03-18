// import Subscription from "./home/Subscription"
import Hero from "./home/Hero"
import Feature from "./home/Feature"

export default function Page() {
  return (
    <main className={`mx-auto max-w-7xl py-24 sm:px-6 lg:px-8 `}>
      <Hero />
      <Feature />
    </main>
  )
}
