import BlogLayoutHero from "app/ui/content/blog-layout-hero"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import { ReactNode } from "react"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BlogLayoutHero />
      <div className="min-h-[50vh] bg-gradient-to-b from-mint to-blue font-sans">
        <MaxWidthWrapper className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2">
          {children}
        </MaxWidthWrapper>
      </div>
    </>
  )
}
