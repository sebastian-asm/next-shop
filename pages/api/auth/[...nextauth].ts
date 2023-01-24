import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

import { dbUsers } from '../../../database'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        )
      },
    }),
  ],
  // personalizar pagina de login y logout
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  // duración de la sesión
  session: {
    maxAge: 2592000, // 30 días
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
  callbacks: {
    // primero se genera el token y luego se pasa a la session
    async jwt({ token, user, account }) {
      // agregando info adicional al payload del token
      if (account) {
        token.accessToken = account.access_token
        if (account.type === 'credentials') {
          token.user = user
        }

        if (account.type === 'oauth') {
          token.user = await dbUsers.verifyOAuth(
            user?.email || '',
            user?.name || ''
          )
        }
      }
      return token
    },
    async session({ session, user, token }: any) {
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    },
  },
}

export default NextAuth(authOptions)
