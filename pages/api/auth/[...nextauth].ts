import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import jwt from "jsonwebtoken"
import { SupabaseAdapter } from "@auth/supabase-adapter"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  }),
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
        try {
          const payload = {
            isNewUser: true,
            subjet: "Welcome to Code Genius",
            name: message.user?.name,
            email: message.user?.email,
            test: true,
          }
          await fetch(`${process.env.NEXTAUTH_URL}/api/send`, {
            method: "POST",
            body: JSON.stringify(payload),
          })
        } catch (error) {
          console.error("error sending welcome email: ", error)
        }
      }
    },
  },
  callbacks: {
    async session({ session, token }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: crypto.randomUUID(),
          email: session?.user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
        //@ts-ignore
        session.user.id = token.user.id
      }
      return session
    },
    async signIn({ user, account }) {
      if (!user.email) {
        return false
      }
      if (account?.provider === "google") {
        //Do something special for Google users.
      }
      return true
    },
    jwt: async ({ token, user }) => {
      // console.log("token, user, trigger:", token, user, trigger)
      if (!token.email) {
        return {}
      }
      if (user) {
        token.user = user
      }
      // if (trigger === "update") {
      //   const refreshedUser = await prisma.user.findUnique({
      //     where: { id: token.sub },
      //   })
      //   token.user = refreshedUser
      // }
      return token
    },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  debug: false,
}
export default NextAuth(authOptions)
