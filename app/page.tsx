import Hero from "./home/Hero"
import Feature from "./home/Feature"
import Subscription from "./home/Subscription"

export const metadata = {
  title: "Create Genius Code",
  description:
    "A playground to explore new Next.js 13 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
}

export default function Page() {
  // Create PaymentIntent as soon as the page loads
  // fetch("http://localhost:3000/api/payments", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log("stripe data::", data))

  return (
    <main className={`mx-auto max-w-max bg-slate-500 py-24`}>
      <Hero />
      {/* <Subscription /> */}
      {/* <Feature /> */}
    </main>
  )
}
