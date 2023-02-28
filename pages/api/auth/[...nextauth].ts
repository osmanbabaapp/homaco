import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        const payload = {
          username: credentials?.username,
          password: credentials?.password,
        }
        const website: string = process.env.NEXT_PUBLIC_WEBSITE!
        const url = process.env.NEXT_PUBLIC_HOST + `/api/auth/login`

        console.log('website')
        console.log(website)

        try {
          const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json', website: website },
          })

          const user = await res.json()

          console.log('user', user)

          if (!res.ok) throw new Error('Failed to login')

          if (res.ok && user) {
            return user?.description
          }
        } catch (err) {
          console.error('err')
          console.error(err)
          throw new Error(String(err))
        }

        return null
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('jwt ___')

      console.log('token', token)
      console.log('user', user)
      console.log('account', account)

      if (account && user) {
        return {
          ...token,
          token: user.token,
          id: user.id,
        }
      }

      return token
    },

    async session({ session, token }) {
      console.log('session ___')
      console.log('session', session)
      console.log('token', token)

      session.user.token = token.token
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect ___')
      console.log('url', url)
      console.log('baseUrl', baseUrl)

      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})
