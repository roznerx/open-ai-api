import BlogLayoutHero from "app/ui/content/blog-layout-hero"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import { ReactNode } from "react"
import { fontPro } from "@/styles/fonts"
import { cn } from "@/lib/utils"

export default async function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <main
        className={cn(
          fontPro.variable,
          "flex w-screen flex-col bg-gradient-to-b from-mint to-blue",
        )}
      >
        <BlogLayoutHero />

        <MaxWidthWrapper className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2">
          {children}
        </MaxWidthWrapper>
      </main>
    </>
  )
}
