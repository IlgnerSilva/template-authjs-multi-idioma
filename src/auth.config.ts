import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

// Notice this is only an object, not a full Auth.js instance
export default {
	providers: [
		Credentials({
			async authorize(user) {
				return user
			},
		}),
		Google,
	],
} satisfies NextAuthConfig
