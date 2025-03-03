import NextAuth, { Session, User } from 'next-auth';
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from 'jwt-decode';
import { getProfile, login } from '@/services/auth';

interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

interface CustomUser extends User {
  accessToken?: string;
  username?: string;
  displayName?: string | null;
  avatar?: string;
  bio?: string;
}

interface CustomSession extends Session {
  accessToken?: string;
  user: {
    id?: string;
    username?: string;
    displayName?: string | null;
    avatar?: string;
    bio?: string;
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
        const user = await login(credentials?.email as string, credentials?.password as string);
        const decodedToken = jwtDecode<DecodedToken>(user.access_token);
        const userId = decodedToken.sub;

        const profile = await getProfile(user.access_token);

        if (user) {
          return {
            id: userId,
            email: credentials?.email as string,
            username: profile.username,
            displayName: profile.displayName,
            avatar: profile.avatar,
            bio: profile.bio,
            accessToken: user.access_token,
          };
        }

        return null;
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
        token.username = user.username;
        token.displayName = user.displayName;
        token.avatar = user.avatar;
        token.bio = user.bio;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: any }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        username: token.username,
        displayName: token.displayName,
        avatar: token.avatar,
        bio: token.bio,
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