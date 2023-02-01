import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const url = process.env.NEXT_API_DOMAIN + `/api/auth/login`;
        try {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();

          if (!res.ok) throw new Error("Failed to login");

          if (res.ok && user) {
            return user;
          }
        } catch (err) {
          console.error("err");
          console.error(err);
          throw new Error(String(err));
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          token: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.token = token.token;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
