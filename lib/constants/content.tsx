import { Bot, CheckCheck, FileText, Gauge, MessageCircle } from "lucide-react"
import tailwindConfig from "tailwind.config"

export type CategoriesType = "company" | "education" | "customer-stories" | "ai"

const themeColors: any = tailwindConfig.theme?.extend?.colors

export const BLOG_CATEGORIES: {
  title: string
  slug: CategoriesType
  description: string
}[] = [
  {
    title: "Company updates",
    slug: "company",
    description: "The latest news from Code Genius.",
  },
  {
    title: "AI updates",
    slug: "ai",
    description: "The latest news from AI",
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

export const CODEGENIUS_FEATURES: {
  title: string
  slug:
    | "/code-idea?mode=smart"
    | "/code-idea?mode=test"
    | "/code-idea?mode=improve"
    | "/code-idea?mode=docs"
    | "/code-chat"
  description: string
  icon: JSX.Element
}[] = [
  {
    title: "Smart Suggestions",
    slug: "/code-idea?mode=smart",
    description: "Start using Smart Suggestions and unblock your creativity.",
    icon: <Bot color={themeColors.morado} className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "Generate Tests",
    slug: "/code-idea?mode=test",
    description:
      "Explore how you can generate unit tests in seconds with Code Genius",
    icon: (
      <CheckCheck
        color={themeColors.morado}
        className="h-6 w-6 text-gray-500"
      />
    ),
  },
  {
    title: "Code Optimization",
    slug: "/code-idea?mode=improve",
    description:
      "Improve and boost your code performance with just a few clicks",
    icon: (
      <Gauge color={themeColors.morado} className="h-6 w-6 text-gray-500" />
    ),
  },
  {
    title: "Docs Generation",
    slug: "/code-idea?mode=docs",
    description:
      "Don't waste your time and let Code Genius create great documentation for you.",
    icon: (
      <FileText color={themeColors.morado} className="h-6 w-6 text-gray-500" />
    ),
  },
  {
    title: "Chat with a coding expert",
    slug: "/code-chat",
    description:
      "Code Genius Chat is like Chat GPT for developers. Try it now!.",
    icon: (
      <MessageCircle
        color={themeColors.morado}
        className="h-6 w-6 text-gray-500"
      />
    ),
  },
]

// export const getPopularArticles = () => {
//   return POPULAR_ARTICLES.map(
//     (slug) => allHelpPosts.find((post) => post.slug === slug)!,
//   )
// }
