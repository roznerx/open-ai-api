"use client"

import { BlogPost } from "contentlayer/generated"
import BlurImage from "../blur-image"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Chip } from "@material-tailwind/react"
import Author from "./author"

export default function BlogCard({
  data,
  priority,
}: {
  data: BlogPost & {
    blurDataURL: string
  }
  priority?: boolean
}) {
  return (
    <Link
      href={`/blog/${data.slug}`}
      className="transform rounded-lg transition duration-500 hover:scale-110"
    >
      <BlurImage
        className="aspect-[1200/630] rounded-t-xl object-cover"
        src={data.image}
        blurDataURL={data.blurDataURL}
        width={1200}
        height={630}
        alt={data.title}
        priority={priority}
      />
      <div className="rounded-b-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="font-pro line-clamp-1 text-2xl font-semibold text-gray-700">
            {data.title}
          </h2>
          <Chip
            className="w-auto bg-blue text-center text-white"
            value={data.categories}
            size="sm"
          />
        </div>
        <p className="mt-2 line-clamp-2 text-gray-500">{data.summary}</p>
        <div className="mt-4 flex items-center space-x-2">
          <Author username={data.author} imageOnly />
          <time dateTime={data.publishedAt} className="text-sm text-gray-500">
            {formatDate(data.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  )
}
