import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				return credentials;
			},
		}),
		Google,
	],
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60,
	},
} satisfies NextAuthConfig;
