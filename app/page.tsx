import Hero from "./home/Hero"
import Feature from "./home/Feature"
// import Subscription from "./home/Subscription"
import SuperHero from "./home/SuperHero"

export const metadata = {
  title: "Create Genius Code",
  description:
    "A tool that will help you find quick and more innovative solutions using AI and specifically trained models to make the developer's life easier.",
}

export default function Page() {
  return (
    <main className={`mx-auto max-w-max py-24`}>
      <SuperHero />
      <Hero />
      <Feature />
    </main>
  )
}

{
  /* <Subscription /> */
}
