"use client"

import Link from "next/link"
import { useMDXComponent } from "next-contentlayer/hooks"
import GithubRepo, { GithubRepoProps } from "@/components/shared/github-repo"
import BlurImage from "#/ui/blur-image"
import MDXTweet from "#/ui/tweet"
import { Tweet as TweetProps } from "react-tweet/api"
import useMediaQuery from "hooks/use-media-query"
import { cn } from "@/lib/utils"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { HELP_CATEGORIES } from "@/lib/constants/content"
import CategoryCard from "./category-card"

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const components = {
  h2: (props: any) => <h2 className="my-8 text-3xl" {...props} />,
  a: (props: any) => (
    <CustomLink
      className="font-medium text-white underline-offset-4 hover:text-mint hover:underline"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-medium text-gray-600 before:hidden after:hidden"
      {...props}
    />
  ),
  thead: (props: any) => <thead className="text-lg" {...props} />,
  Note: (props: any) => (
    <div
      className={cn(
        "mt-4 rounded-md border-l-4 border-gray-500 bg-gray-100 px-4 py-1 text-[0.95rem] leading-[1.4rem]",
        {
          "border-yellow-500 bg-yellow-100": props.variant === "warning",
          "border-blue-500 bg-blue-100": props.variant === "info",
          "border-green-500 bg-green-100": props.variant === "success",
        },
      )}
      {...props}
    />
  ),
  HelpCategories: () => (
    <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {HELP_CATEGORIES.map((category) => (
        <CategoryCard
          key={category.slug}
          href={`/help/category/${category.slug}`}
          name={category.title}
          description={category.description}
          icon={category.icon}
          pattern={{
            y: 16,
            squares: [
              [0, 1],
              [1, 3],
            ],
          }}
        />
      ))}
    </div>
  ),
}

interface MDXProps {
  code: string
  images?: { alt: string; src: string; blurDataURL: string }[]
  tweets?: any[]
  repos?: GithubRepoProps[]
  className?: string
}

export function MDX({ code, images, tweets, repos, className }: MDXProps) {
  const Component = useMDXComponent(code)
  const { isDesktop } = useMediaQuery()

  const MDXImage = (props: any) => {
    if (!images) return null
    const blurDataURL = images.find(
      (image) => image.src === props.src,
    )?.blurDataURL

    return (
      // we need to wrap the image in a HTML element or showModal will throw errors
      <>
        <figure className="not-prose mt-4 flex flex-col items-center justify-center space-y-3">
          <Zoom zoomMargin={isDesktop ? 45 : undefined}>
            <BlurImage
              {...props}
              className="rounded-lg border border-gray-200"
              placeholder="blur"
              blurDataURL={
                blurDataURL ||
                "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
              }
            />
          </Zoom>
          <figcaption className="text-sm text-center italic text-white">
            {props.alt}
          </figcaption>
        </figure>
      </>
    )
  }

  const Tweet = ({ id }: { id: string }) => {
    if (!tweets) return null
    const tweet = tweets.find((tweet: TweetProps) => tweet.id_str === id)
    return <MDXTweet data={tweet} className="mx-auto max-w-lg" noTilt />
  }

  const MDXRepo = ({ url }: { url: string }) => {
    if (!repos) return null
    const repo = repos.find((repo) => repo.url === url)
    return <GithubRepo {...repo!} />
  }

  return (
    <article
      data-mdx-container
      className={cn(
        "prose prose-gray prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-pro prose-headings:font-bold max-w-none transition-all",
        className,
      )}
    >
      <Component
        components={{
          ...components,
          Image: MDXImage,
          Tweet,
          MDXRepo,
        }}
      />
    </article>
  )
}
