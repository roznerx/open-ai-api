import BlogLayoutHero from "app/ui/content/blog-layout-hero"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import { ReactNode } from "react"
import { fontPro } from "@/styles/fonts"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

export default async function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <main className={cn(fontPro.variable, "flex w-screen flex-col")}>
        <BlogLayoutHero />
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
    </>
  )
}
