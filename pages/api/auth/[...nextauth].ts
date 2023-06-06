import NextAuth, { AuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { HarperDBAdapter } from "adapters/harperdb"

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: HarperDBAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  events: {
    async signIn({ user }) {
      //@ts-ignore
      if (user && user?.registered) {
        const fetchUrl = `${process.env.NEXTAUTH_URL}/api/email/generate-html-email?name=${user.name}`
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        try {
          const response = await fetch(fetchUrl, {
            method: "GET",
            next: { revalidate: 0 },
            headers: headers,
          })
          const { html } = await response.json()
          const payload = {
            isNewUser: true,
            name: user?.name,
            email: user?.email,
            html,
          }
          await fetch(`${process.env.NEXTAUTH_URL}/api/email/send`, {
            method: "POST",
            next: { revalidate: 0 },
            body: JSON.stringify(payload),
          })
        } catch (error) {
          console.error("error::", error)
        }
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      return user || account ? true : false
    },
    async session({ session, user }) {
      if (user && user.id) {
        const newSession = {
          ...session,
          user: {
            ...user,
            name:
              (user && user?.name) ||
              session?.user?.name ||
              user.email.split("@")[0],
            id: user.id,
          },
        }

        return newSession
      } else {
        return session
      }
    },
    async redirect({ url, baseUrl }) {
      // if (!url.includes("/code-idea")) return `${url}/code-idea`
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  debug: false,
}
export default NextAuth(authOptions)
