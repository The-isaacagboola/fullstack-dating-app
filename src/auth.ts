import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      console.log("tokken :::", token);

      return token;
    },
    async session({ session, token }) {
      console.log("session :::", session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
