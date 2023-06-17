import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "@/sanity/sanity";
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
    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user.username = session.user?.email?.split("@")[0] || "";
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const schemaUser = {
        _id: user.id,
        _type: "user",
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        username: user.email?.split("@")[0] || "",
      };
      await createUser(schemaUser);
      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
