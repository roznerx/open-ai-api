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
    <MaxWidthWrapper className="bg-gradient-to-r from-mint to-blue">
      <div className=" py-16">
        <div className="flex items-center justify-center">
          <h2 className="ml-2 font-sans text-3xl font-extrabold text-purple-900 sm:text-4xl">
            {data?.title || "Code Genius Blog"}
          </h2>
        </div>
        <div className="flex items-center justify-center  text-purple-900">
          <h3 className="mt-4 text-3xl ">
            {data?.description ||
              "Find out the latest news of AI, our new features and more."}
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
      <div className="text-sm active:bg-green rounded-md px-3 py-2 text-gray-200 transition-all hover:bg-morado hover:text-white">
        {title}
      </div>
    </Link>
  )
}
