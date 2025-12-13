import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig, User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Use API_URL for server-side requests (Docker internal), fallback to NEXT_PUBLIC_API_URL for local dev
          const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(
            `${apiUrl}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            return null;
          }

          const user = await res.json();
          
          if (user && user.id) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.username,
            };
          }
          
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export default authConfig;
