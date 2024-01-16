import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import WelcomeEmail from "emails/welcome-email"
import { sendEmail } from "emails"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
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
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? "code-genius.dev" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email as string
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            name: true,
            createdAt: true,
          },
        })
        // only send the welcome email if the user was created in the last 10s
        // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
        if (
          user?.createdAt &&
          new Date(user.createdAt).getTime() > Date.now() - 10000
        ) {
          sendEmail({
            subject: "Welcome to Dub.sh!",
            email,
            react: WelcomeEmail({
              name: user.name || null,
            }),
            marketing: true,
          })
        }
      }
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false
      }
      if (account?.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        })
        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && !userExists.name) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              // @ts-ignore - this is a bug in the types, `picture` is a valid on the `Profile` type
              image: profile?.picture,
            },
          })
        }
      }
      return true
    },
    jwt: async ({ token, user, trigger }) => {
      if (!token.email) {
        return {}
      }
      if (user) {
        token.user = user
      }
      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        })
        token.user = refreshedUser
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      }
      return session
    },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  debug: false,
}
export default NextAuth(authOptions)
