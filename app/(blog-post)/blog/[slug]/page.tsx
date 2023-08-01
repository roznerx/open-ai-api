import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { allBlogPosts } from "contentlayer/generated"
import { notFound } from "next/navigation"
import Link from "next/link"
import Author from "#/ui/content/author"
import { fontPro } from "@/styles/fonts"
import { MDX } from "#/ui/content/mdx"
import { getBlurDataURL } from "@/lib/images"
import { Metadata } from "next"
import { cn, constructMetadata, formatDate } from "@/lib/utils"
import { getTweet } from "react-tweet/api"
import BlurImage from "#/ui/blur-image"
import { BLOG_CATEGORIES } from "@/lib/constants/content"

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

  const [thumbnailBlurhash, images, tweets] = await Promise.all([
    getBlurDataURL(data.image),
    await Promise.all(
      data.images.map(async (src: string) => ({
        src,
        blurDataURL: await getBlurDataURL(src),
      })),
    ),
    await Promise.all(data.tweetIds.map(async (id: string) => getTweet(id))),
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
      <MaxWidthWrapper
        className={cn(
          fontPro.variable,
          "bg-gradient-to-r from-mint to-blue font-pro",
        )}
      >
        <div className="flex flex-col space-y-4 pt-16">
          <div className="flex items-center space-x-4">
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-sm rounded-full border border-none bg-morado px-4 py-1.5 font-semibold text-white"
            >
              {category.title}
            </Link>
            <time
              dateTime={data.publishedAt}
              className="text-sm text-purple-900 transition-colors hover:text-gray-800"
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

      <div
        className={cn(
          fontPro.variable,
          "relative h-full bg-purple-500 font-pro text-2xl",
        )}
      >
        {/* <div className="absolute top-52 h-full w-full" /> */}
        <MaxWidthWrapper className="grid grid-cols-4 gap-10 px-0 sm:py-10">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 rounded-xl bg-white md:col-span-3">
            <BlurImage
              className="aspect-[1200/630] object-cover sm:rounded-t-xl"
              src={data.image}
              blurDataURL={thumbnailBlurhash}
              width={1200}
              height={630}
              alt={data.title}
              priority // cause it's above the fold
            />
            <MDX
              code={data.body.code}
              images={images}
              tweets={tweets}
              className="px-5 pb-20 pt-4 sm:px-10"
            />
          </div>
          <div className="sticky top-20 col-span-1 mt-48 hidden flex-col divide-y divide-gray-200 self-start bg-purple-500 sm:flex">
            <div className="flex flex-col space-y-4 py-5">
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
