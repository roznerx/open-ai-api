"use client"

import { BLOG_CATEGORIES } from "@/lib/constants/content"
import { cn } from "@/lib/utils"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function BlogLayoutHero() {
  const { slug } = useParams() as { slug?: string }
  const router = useRouter()
  const data = BLOG_CATEGORIES.find((category) => category.slug === slug)

  return (
    <MaxWidthWrapper className="bg-purple-500">
      <div className="max-w-screen-sm py-16">
        <div className="inline-flex items-center justify-center">
          <h2 className="ml-2 font-sans text-3xl font-extrabold text-mint sm:text-4xl">
            {data?.title || "Code Genius Blog"}
          </h2>
        </div>
        <p className="text-xl mt-4 text-gray-200">
          {data?.description || "Latest news and updates from Code Genius."}
        </p>
        <div className="mt-6 flex items-center space-x-4">
          <CategoryLink title="All" href="/blog" active={!slug} />
          {BLOG_CATEGORIES.map((category) => (
            <CategoryLink
              key={category.slug}
              title={category.title}
              href={`/blog/category/${category.slug}`}
              active={category.slug === slug}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

const CategoryLink = ({
  title,
  href,
  active,
}: {
  title: string
  href: string
  active: boolean
}) => {
  return (
    <Link
      href={href}
      className={cn("border-b-2  border-transparent py-1", {
        "border-mint text-mint": active,
      })}
    >
      <div className="text-sm active:bg-green rounded-md px-3 py-2 text-gray-200 transition-all hover:bg-mint hover:text-purple-800">
        {title}
      </div>
    </Link>
  )
}
