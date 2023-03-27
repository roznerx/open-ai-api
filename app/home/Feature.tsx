"use client"

import Image from "next/image"
import Link from "next/link"

export default function Feature() {
  return (
    <>
      <section className="mt-8 text-white">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          <div className="mt-4">
            <Image
              className="rounded-md"
              src="/home/smart.svg"
              alt="React Library"
              width="599"
              height="375"
            />
          </div>
          <div className="mt-4 p-2">
            <h1 className="max-w-xs pl-3 text-5xl font-bold">
              Smart suggestions
            </h1>
            <p className="mt-4 p-3">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mt-4 p-2">
            <h1 className="max-w-xs pl-3 text-5xl font-bold">Bug Detection</h1>
            <p className="mt-4 p-3">
              Our software offers smart generation capabilities, allowing
              developers to generate high-quality code with ease. With this
              feature, developers can save time and effort in writing code,
              resulting in increased productivity and faster development cycles.
            </p>
          </div>
          <div className="mt-4">
            <Image
              className="rounded-md"
              src="/home/detection.svg"
              alt="React Library"
              width="500"
              height="375"
            />
          </div>
          <div className="mt-4">
            <Image
              className=""
              src="/home/generation.svg"
              alt="React Library"
              width="350"
              height="375"
            />
          </div>
          <div className="mt-4 p-2">
            <h1 className="max-w-xs pl-3 text-5xl font-bold">
              Test Generation
            </h1>
            <p className="mt-4 p-3">
              You can generate tests based on the provided function. With this
              feature, developers can quickly and easily generate test cases for
              their functions, ensuring that their code is thoroughly tested and
              reliable. This feature can save developers a significant amount of
              time and effort in manually creating test cases.
            </p>
          </div>

          <div className="mt-4">
            <h1 className="max-w-xs pl-3 text-5xl font-bold">Code Ideas</h1>
            <p className="mt-4 p-3">
              Our software includes a feature that provides developers with code
              ideas based on the context of their current project. This feature
              can be especially useful for new developers who may not be as
              familiar with the language or libraries they are working with.
              With this feature, developers can save time in researching and
              experimenting with new code solutions, resulting in faster
              development cycles and increased productivity.
            </p>
          </div>
          <div className="mt-4">
            <Image
              className="rounded-md"
              src="/home/ideas.svg"
              alt="React Library"
              width="500"
              height="375"
            />
          </div>
        </div>
      </section>
    </>
  )
}
