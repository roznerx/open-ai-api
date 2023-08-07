"use client"

import { BLOG_CATEGORIES } from "@/lib/constants/content"
import { CategoryLink } from "app/ui/content/blog-layout-hero"
import { useParams } from "next/navigation"

export default function CategoryNav() {
  const { slug } = useParams() as { slug?: string }
  return (
    <>
      <div className="mt-6 flex items-center justify-center space-x-4">
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
    </>
  )
}
