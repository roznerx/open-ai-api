import { timeAgo } from "@/lib/utils"
import BlurImage from "#/ui/blur-image"
import React, { ReactElement } from "react"

type AuthorProps = {
  username: string
  updatedAt?: string
  imageOnly?: boolean
}

export default function Author({
  username,
  updatedAt,
  imageOnly,
}: AuthorProps): ReactElement {
  const authors = {
    lgruss: {
      name: "Lautaro Gruss",
      image:
        "data:image/jpeg;base64,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",
    },
    croch: {
      name: "Carolina Rodriguez",
      image: "https://d2vwwcvoksz7ty.cloudfront.net/author/fmerian.jpg",
    },
    steventey: {
      name: "Steven Tey",
      image: "https://d2vwwcvoksz7ty.cloudfront.net/author/steventey.jpg",
    },
    fmerian: {
      name: "Flo Merian",
      image: "https://d2vwwcvoksz7ty.cloudfront.net/author/fmerian.jpg",
    },
  }

  return imageOnly ? (
    <BlurImage
      src={authors[username].image}
      alt={authors[username].namee}
      width={36}
      height={36}
      className="rounded-full transition-all group-hover:brightness-90"
    />
  ) : updatedAt ? (
    <div className="flex items-center space-x-3">
      <BlurImage
        src={authors[username].image}
        alt={authors[username].name}
        width={36}
        height={36}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-sm text-gray-200">
          Written by {authors[username].name}
        </p>
        <time dateTime={updatedAt} className="text-sm font-light text-gray-400">
          Last updated {timeAgo(new Date(updatedAt))}
        </time>
      </div>
    </div>
  ) : (
    <div className="group flex items-center space-x-3">
      <BlurImage
        src={authors[username].image}
        alt={authors[username].name}
        width={40}
        height={40}
        className="rounded-full transition-all group-hover:brightness-90"
      />
      <div className="flex flex-col">
        <p className="font-semibold text-gray-200">{authors[username].name}</p>
        <p className="text-sm text-gray-200">@{username}</p>
      </div>
    </div>
  )
}
