import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import connectMongoDB from './src/libs/mongodb'
import User from './src/models/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      const apiUrl = process.env.API_URL
      const { name, email } = user

      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          await connectMongoDB()
          const userExists = await User.findOne({ email })
          if (!userExists) {
            const res = await fetch(`${apiUrl}/api/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email }),
            })
            if (!res.ok) {
              console.error('Failed to create user in database')
              return false
            }
          }
          return true
        } catch (error) {
          console.error('Error during authentication:', error)
          return false
        }
      }
      return false
    },
  },
})

export default auth
