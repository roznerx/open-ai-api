import Hero from "./home/Hero"
import { ChangeEvent, KeyboardEvent } from "react"
import Feature from "./home/Feature"
// import Subscription from "./home/Subscription"
import SuperHero from "./home/SuperHero"

export const metadata = {
  title: "Create Genius Code",
  description:
    "A playground to explore new Next.js 13 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
}

export default function Page() {
  return (
    <main className={`mx-auto max-w-max py-24`}>
      <SuperHero />
      <Hero />
      {/* <Subscription /> */}
      <Feature />
    </main>
  )
}
