import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { allBlogPosts } from "contentlayer/generated"
import { notFound } from "next/navigation"
import Link from "next/link"
import Author from "#/ui/content/author"
import { MDX } from "#/ui/content/mdx"
import { getBlurDataURL } from "@/lib/images"
import { Metadata } from "next"
import { cn, constructMetadata, formatDate } from "@/lib/utils"
import BlurImage from "#/ui/blur-image"
import { BLOG_CATEGORIES } from "@/lib/constants/content"
import BlogBreadcrumbs from "app/ui/navigation/Breadcrumbs"
import { ArrowLeft } from "lucide-react"

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allBlogPosts.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, summary, image } = post

  return constructMetadata({
    title: `${title} – Code Genius Blog`,
    description: summary,
    image,
  })
}

export const dynamic = "force-static"

export default async function BlogArticle({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const data = allBlogPosts.find((post) => post.slug === params.slug)

  if (!data) {
    notFound()
  }

  const [thumbnailBlurhash, images] = await Promise.all([
    getBlurDataURL(data.image),
    await Promise.all(
      data.images.map(async (src: string) => ({
        src,
        blurDataURL: await getBlurDataURL(src),
      })),
    ),
  ])

  const category = BLOG_CATEGORIES.find(
    (category) => category.slug === data.categories[0],
  )!

  const relatedArticles =
    (data.related &&
      data.related.map(
        (slug) => allBlogPosts.find((post) => post.slug === slug)!,
      )) ||
    []

  return (
    <>
      <MaxWidthWrapper className={cn("bg-gradient-to-r from-mint to-blue")}>
        <BlogBreadcrumbs />
        <div className="flex flex-col space-y-4 pt-8">
          <div className="flex items-center space-x-4">
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-sm rounded-full border border-none bg-purple-900 px-4 py-1.5 font-semibold text-white"
            >
              {category.title}
            </Link>
            <time
              dateTime={data.publishedAt}
              className="text-sm text-purple-900 transition-colors"
            >
              {formatDate(data.publishedAt)}
            </time>
          </div>
          <h1 className="text-3xl font-extrabold text-purple-900 sm:text-4xl">
            {data.title}
          </h1>
          <p className="my-4 pb-4 text-2xl text-purple-900">{data.summary}</p>
        </div>
      </MaxWidthWrapper>

      <div className={cn("relative h-full bg-purple-900 text-white")}>
        {/* <div className="absolute top-52 h-full w-full" /> */}
        <MaxWidthWrapper className="grid grid-cols-4 gap-10 px-0 sm:py-10">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 rounded-xl bg-purple-500 pb-8 md:col-span-3">
            <BlurImage
              className="aspect-[1200/630] object-cover sm:rounded-t-xl"
              src={data.image}
              blurDataURL={thumbnailBlurhash}
              width={1200}
              height={630}
              alt={data.title || "Blog image"}
              priority // cause it's above the fold
            />
            <MDX
              code={data.body.code}
              images={images}
              className="px-5 pb-20 pt-4 text-2xl sm:px-10"
            />

            <div className="text-sm absolute bottom-2 left-0 ml-4 h-12 w-auto rounded-full border border-none bg-purple-900 px-4 py-3.5 text-gray-200 md:ml-9">
              <Link href={`/blog`} className="relative inline-flex ">
                <ArrowLeft color="#E9E9EB" size={22} className="pr-1 " />
                <span className="-mt-[1px]">Back to blog</span>
              </Link>
            </div>
          </div>
          <div className="text-xs sticky top-8 col-span-1 hidden flex-col divide-y divide-purple-500  self-start bg-purple-900 sm:flex">
            <div className="text-xs flex flex-col space-y-4 py-5">
              <p className="text-sm text-gray-200">Written by</p>
              <Author username={data.author} />
            </div>
            {relatedArticles.length > 0 && (
              <div className="flex flex-col space-y-4 py-5">
                <p className="text-sm text-gray-200">Read more</p>
                <ul className="flex flex-col space-y-4">
                  {relatedArticles.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col space-y-2"
                      >
                        <p className="font-semibold text-mint underline-offset-4 group-hover:underline">
                          {post.title}
                        </p>
                        <p className="text-sm line-clamp-2 text-gray-200 underline-offset-2 group-hover:underline">
                          {post.summary}
                        </p>
                        <p className="text-xs text-gray-200 underline-offset-2 group-hover:underline">
                          {formatDate(post.publishedAt)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  )
}
