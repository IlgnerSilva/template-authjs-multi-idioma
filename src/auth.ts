import { findByUserEmail, insertUser, updateUser } from '@/services/user';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: 1,
	},
	pages: {
		signIn: '/auth/login',
	},
	jwt: {
		maxAge: 1,
	},
	callbacks: {
		jwt: async ({ account, token, user, session, profile, trigger }) => {
			token.exp = 1;
			token.name = 'Ilgner';
			console.log({ account, token, user, session, profile, trigger });
			return token;
		},
		signIn: async ({ user, account, profile, credentials, email }) => {
			if (credentials) return true;

			const userFound = await findByUserEmail(user.email as string);

			if (!userFound[0]) {
				await insertUser({
					user_id: user.id,
					email: user.email as string,
					name: user.name as string,
					email_verified: profile?.email_verified,
					provider: account?.provider,
					provider_user_id: account?.providerAccountId,
					image: profile?.picture,
				});
				return true;
			}

			if (
				!userFound[0].provider ||
				(userFound[0].provider && userFound[0].provider === account?.provider)
			) {
				await updateUser({
					email: user.email as string,
					provider: account?.provider,
					provider_user_id: account?.providerAccountId,
				});
				return true;
			}

			return false;
		},
		session: async ({ session, user, token }) => {
			console.log({ session, user, token });
			return session;
		},

		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			return url;
		},
	},

	debug: false,
	...authConfig,
});
