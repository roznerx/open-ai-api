import { timeAgo } from "#/lib/utils"
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
      image: "/authors/lautaro-gruss.jpeg",
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
    <div className="text-xs flex items-center space-x-3">
      <BlurImage
        src={authors[username].image}
        alt={authors[username].name}
        width={36}
        height={36}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className=" font-normal text-gray-200">
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
