import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import connectMongoDB from './src/libs/mongodb'
import User from './src/models/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
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
            if (res.ok) {
              return true
            }
          }
        } catch (error) {
          console.log(error)
          return true
        }
      }
      return false
    },
  },
})
