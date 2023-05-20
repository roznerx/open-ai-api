import NextAuth, { AuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { HarperDBAdapter } from "adapters/harperdb"
import { sendWelcomeEmail } from "utils/sendEmail"

const server = process.env.EMAIL_SERVER
const from = process.env.EMAIL_FROM

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
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/email/generate-html-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        },
      )
      const { html } = await response.json()
      //@ts-ignore
      console.log("user reg", user)

      //@ts-ignore
      if (user && user.registered) {
        await sendWelcomeEmail({
          name: user?.name,
          html,
          identifier: user?.email,
          provider: { server, from },
        })
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      return user && user?.name ? true : false
    },
    async session({ session, user }) {
      if (user && user.id) {
        const newSession = {
          ...session,
          user: {
            ...user,
            id: user.id,
          },
        }

        return newSession
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      return token
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
