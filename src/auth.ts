import { db } from '@/db/index'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`
			}
			return url
		},
	},
	debug: true,
	...authConfig,
})
