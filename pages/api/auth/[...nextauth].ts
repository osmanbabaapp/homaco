import { RequestInternal } from "next-auth";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

export type ILoginInput = {
  username: string;
  password: string;
};

type IAuthorize = {
  credentials: Record<never, string>;
  req: Pick<RequestInternal, "body">;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "site",
      authorize: async (credentials): Promise<{ id: number } | null> => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // validate data
        if (email !== "alex@email.com" && password !== "1234") {
          throw new Error("invalid credentials");
        }

        // confirmed user
        return {
          id: 1,
          //   name: "Alex",
          //   email: "alex@email.com",
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session({ session, token, user }: any) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
