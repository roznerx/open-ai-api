"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function BlogBreadcrumbs() {
  const pathname = usePathname()
  const pathNameParts = pathname?.split("/")

  return (
    <div className="mt-20 flex items-center gap-x-1 p-3.5 lg:px-2 lg:py-3">
      <div className="text-sm flex gap-0">
        {pathname && pathNameParts?.[0] === "" && (
          <Link href={"/"} className="px-2 text-gray-700">
            Home
          </Link>
        )}
        <span className="text-gray-700">/</span>

        <Link href={"/blog"} className="px-2 text-gray-700">
          {pathNameParts?.[1]}
        </Link>

        {pathname ? (
          <>
            <span className="text-gray-600">/</span>
            {pathname
              .split("/")
              .slice(2)
              .map((segment) => {
                return (
                  <React.Fragment key={segment}>
                    <span>
                      <span
                        key={segment}
                        className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 font-semibold capitalize text-gray-700"
                      >
                        {segment.split("-").join(" ")}
                      </span>
                    </span>
                  </React.Fragment>
                )
              })}
          </>
        ) : null}
      </div>
    </div>
  )
}
