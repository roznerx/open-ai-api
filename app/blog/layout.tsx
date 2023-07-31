import BlogLayoutHero from "app/ui/content/blog-layout-hero"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import { ReactNode } from "react"
import { fontPro } from "@/styles/fonts"
import Header from "app/components/Header"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { getDictionary } from "app/(lang)/dictionaries"

export default async function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)
  const dictionary = await getDictionary("en")
  return (
    <>
      <Header session={session} translations={dictionary.home.header} />
      <main className={fontPro.variable}>
        <BlogLayoutHero />
        <div className="min-h-[50vh] bg-gradient-to-b from-mint to-blue">
          <MaxWidthWrapper className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2">
            {children}
          </MaxWidthWrapper>
        </div>
      </main>
    </>
  )
}
