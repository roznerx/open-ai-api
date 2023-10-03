import { allBlogPosts } from "contentlayer/generated"

import { BLOG_CATEGORIES } from "../lib/constants/content"
import { MetadataRoute } from "next"

export default function Sitemap(): MetadataRoute.Sitemap {
  const productionHost = "code-genius.dev"
  return [
    {
      url: `https://${productionHost}`,
      lastModified: new Date(),
    },
    {
      url: `https://${productionHost}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `https://${productionHost}/blog`,
      lastModified: new Date(),
    },
    ...allBlogPosts.map((post) => ({
      url: `https://${productionHost}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
    ...BLOG_CATEGORIES.map((category) => ({
      url: `https://${productionHost}/blog/category/${category.slug}`,
      lastModified: new Date(),
    })),
  ]
}
