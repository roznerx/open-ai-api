import Logo from "app/components/shared/Logo"
import { Globe, Link2, Settings, Webhook } from "lucide-react"

export const BLOG_CATEGORIES: {
  title: string
  slug: "company" | "education" | "customer-stories" | "ai"
  description: string
}[] = [
  {
    title: "Company updates",
    slug: "company",
    description: "The latest news from Code Genius",
  },
]

export const POPULAR_ARTICLES = [
  "what-is-dub",
  "what-is-a-project",
  "how-to-add-custom-domain",
  "how-to-use-tags",
  "how-to-invite-teammates",
  "pro-plan",
]

export const HELP_CATEGORIES: {
  title: string
  slug:
    | "overview"
    | "getting-started"
    | "ai-news"
    | "link-management"
    | "custom-domains"
    | "api"
  description: string
  icon: JSX.Element
}[] = [
  {
    title: "Dub Overview",
    slug: "overview",
    description: "Learn about Dub and how it can help you.",
    icon: <Logo />,
  },
  {
    title: "Getting Started",
    slug: "getting-started",
    description: "Learn how to get started with Dub.",
    icon: <Settings className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "AI News",
    slug: "ai-news",
    description: "Latest updates from AI.",
    icon: <Settings className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "Link Management",
    slug: "link-management",
    description: "Learn how to manage your links on Dub.",
    icon: <Link2 className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "Custom Domains",
    slug: "custom-domains",
    description: "Learn how to use custom domains with Dub.",
    icon: <Globe className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "API",
    slug: "api",
    description: "Learn how to use the Dub API.",
    icon: <Webhook className="h-6 w-6 text-gray-500" />,
  },
]

// export const getPopularArticles = () => {
//   return POPULAR_ARTICLES.map(
//     (slug) => allHelpPosts.find((post) => post.slug === slug)!,
//   )
// }
