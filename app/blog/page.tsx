import { getBlurDataURL } from "@/lib/images"
import { constructMetadata } from "@/lib/utils"
import BlogCard from "#/ui/content/blog-card"
import { allBlogPosts } from "contentlayer/generated"
import CategoryNav from "./category-nav"

export const metadata = constructMetadata({
  title: "Blog",
  description: "Latest news and updates from Code Genius.",
})

export default async function Blog() {
  const articles = await Promise.all(
    // order by publishedAt (desc)
    allBlogPosts
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(async (post) => ({
        ...post,
        blurDataURL: await getBlurDataURL(post.image),
      })),
  )
  return (
    <>
      <CategoryNav />
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 justify-start gap-8 px-2.5 py-10 md:grid-cols-3 lg:px-5">
        {articles.map((article, idx) => {
          return (
            <BlogCard key={article.slug} data={article} priority={idx <= 1} />
          )
        })}
      </div>
    </>
  )
}
