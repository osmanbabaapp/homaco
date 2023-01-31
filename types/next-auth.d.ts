import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      token: string;
    } & DefaultSession["user"];
  }
}
