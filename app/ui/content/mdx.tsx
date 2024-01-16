"use client"

import Link from "next/link"
import { useMDXComponent } from "next-contentlayer/hooks"
import { GithubRepoProps } from "@/components/shared/github-repo"
import BlurImage from "#/ui/blur-image"
import useMediaQuery from "hooks/use-media-query"
import { cn } from "@/lib/utils"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { CODEGENIUS_FEATURES } from "#/lib/constants/content"
import CategoryCard from "./category-card"
import Video from "../video"

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
  h2: (props: any) => <h2 className="mb-4 mt-8 text-3xl" {...props} />,
  li: (props: any) => <li className="my-4 ml-8 list-disc" {...props} />,
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
  Video: ({
    poster,
    videoSrc,
    noTilt = true,
  }: {
    videoSrc: string
    poster: string
    noTilt: boolean
  }) => <Video videoSrc={videoSrc} noTilt={noTilt} poster={poster} />,
  CodeGeniusFeatures: () => (
    <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {CODEGENIUS_FEATURES.map((category) => (
        <CategoryCard
          key={category.slug}
          href={`${category.slug}`}
          name={category.title}
          description={category.description}
          icon={category.icon}
          pattern={{
            y: 11,
            squares: [
              [0, 3],
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

export function MDX({ code, images, className }: MDXProps) {
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

  return (
    <article
      data-mdx-container
      className={cn(
        "prose prose-gray prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-bold max-w-none transition-all",
        className,
      )}
    >
      <Component
        components={{
          ...components,
          Image: MDXImage,
        }}
      />
    </article>
  )
}
