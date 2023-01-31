// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Email and Password",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials: any) => {
//         const payload = {
//           email: credentials.email,
//           password: credentials.password,
//         };

//         const url = process.env.NEXT_API_DOMAIN + `/api/auth/login`;

//         const res = await fetch(url, {
//           method: "POST",
//           body: JSON.stringify(payload),
//           headers: { "Content-Type": "application/json" },
//         });

//         const user = await res.json();

//         if (res.ok && user) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (account && user) {
//         return {
//           ...token,
//           accessToken: user.token,
//         };
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   // Enable debug messages in the console if you are having problems
//   debug: process.env.NODE_ENV === "development",
// });
