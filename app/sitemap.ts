export default async function sitemap() {
  const routes = ["", "/code-idea", "/code-chat", "/pricing"].map((route) => ({
    url: `https://www.code-genius.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes]
}
