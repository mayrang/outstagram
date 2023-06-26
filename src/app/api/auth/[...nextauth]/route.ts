import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { createUser } from "@/service/user";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      const checkUser = session?.user;
      if (checkUser) {
        session.user.username = session.user?.email?.split("@")[0] || "";
        session.user.id = token.id as string;
      }

      return session;
    },
    async signIn({ user: { id, email, name, image } }) {
      if (!email) {
        return false;
      }
      const schemaUser = {
        id,
        name: name || "",
        email: email,
        image,
        username: email.split("@")[0],
      };
      await createUser(schemaUser);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
