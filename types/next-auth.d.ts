import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      token: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    address: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
  }
}
