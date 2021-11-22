import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { requestGithubEmail } from '../../../utils/utils'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'db'

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: ['read:user', 'user:email'],
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Username may be 'null' from Github in the user object,
            // exists as 'login' in the profile object
            if (!user.username) {
                user.username = profile.login
            }
            // Email address may not be returned by GitHub due to privacy settings
            // We can retrieve it manually from the user's profile
            if (!user.email) {
                const emailAddress = await requestGithubEmail(
                    account.access_token
                )
                if (emailAddress) {
                    profile.email = emailAddress
                    user.email = emailAddress
                    return true
                }
                return false
            }

            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            // Username isn't injected into session, so we need to add it
            session.user.username = user.username
            session.user.id = user.id
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
    },
})
