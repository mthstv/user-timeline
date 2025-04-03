import NextAuth, { Session, User } from 'next-auth';
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from 'jwt-decode';
import { login } from '@/services/auth';

interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

interface CustomUser extends User {
  accessToken?: string;
}

interface CustomSession extends Session {
  accessToken?: string;
  user: {
    id?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials?.email as string, credentials?.password as string);

          if (user) {
            const decodedToken = jwtDecode<DecodedToken>(user.access_token);
            const userId = decodedToken.sub;
            return {
              id: userId,
              email: credentials?.email as string,
              accessToken: user.access_token,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }: { token: any; user: CustomUser }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.maxAge = 3600;
        token.exp = Math.floor(Date.now() / 1000) + 3600;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: any }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
});