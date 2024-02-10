"use client"

import { BLOG_CATEGORIES } from "@/lib/constants/content"
import { cn } from "@/lib/utils"
import MaxWidthWrapper from "app/components/shared/max-width-wrapper"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BlogLayoutHero() {
  const { slug } = useParams() as { slug?: string }

  const data = BLOG_CATEGORIES.find((category) => category.slug === slug)

  return (
    <MaxWidthWrapper className="h-auto bg-black pb-20 ">
      <div className="mt-12 flex flex-col justify-center">
        <div className="flex items-center justify-center pt-20">
          <h2 className="text-center font-sans text-3xl font-semibold text-white sm:text-4xl">
            {data?.title || "Follow the AI latest news"}
          </h2>
        </div>
        <div className="flex items-center justify-center text-white">
          <h3 className="w-4/5 text-center text-2xl font-normal sm:text-3xl">
            {data?.description ||
              "Discover the most recent updates regarding artificial intelligence"}
          </h3>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export const CategoryLink = ({
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
        "border-morado text-mint": active,
      })}
    >
      <div className="text-sm active:bg-green rounded-md px-3 py-2 text-white transition-all hover:bg-morado/90 hover:text-white">
        {title}
      </div>
    </Link>
  )
}
