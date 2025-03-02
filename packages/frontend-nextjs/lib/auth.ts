import { getAuthUser } from "@/services/auth"
import NextAuth, { Session, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

interface CustomUser extends User {
  accessToken?: string;
}

interface CustomSession extends Session {
  accessToken?: string;
  id?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
  
          user = await getAuthUser(
            credentials?.email as string,
            credentials?.password as string
          )

          if (!user) {
            throw new Error("Invalid credentials.")
          }

          return { accessToken: user.accessToken };
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as CustomUser).accessToken;
        token.id = user.id as string;
        token.maxAge = 172800;
        token.exp = Math.floor(Date.now() / 1000) + 172800;
      }
      return token;
    },
    async session({ session, token }) {
      (session as CustomSession).accessToken = token.accessToken as string;
      if (!session.user) throw new Error("No user found in session");
      session.user.id = token.id as string;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 172800,
  },
})