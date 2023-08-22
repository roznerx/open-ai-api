import BlogLayoutHero from "app/ui/content/blog-layout-hero"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import { ReactNode } from "react"
import { cn } from "#/lib/utils"

export const dynamic = "force-static"

export default async function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <main className={cn("flex w-screen flex-col")}>
        <BlogLayoutHero />
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
    </>
  )
}
