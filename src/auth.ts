import { findByUserEmail, insertUser, updateUser } from '@/services/user';
import NextAuth, { type Session } from 'next-auth';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/auth/login',
	},
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		signIn: async ({ user, account, profile, credentials }) => {
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
				if (!userFound[0].name || !userFound[0].email_verified) {
					await updateUser({
						email: user.email as string,
						name: userFound[0].name ?? user.name,
						email_verified: true,
						provider: account?.provider,
						provider_user_id: account?.providerAccountId,
					});
				}
				return true;
			}
			return false;
		},
		jwt: async ({ token, user, trigger, session }) => {
			if (trigger && trigger === 'update' && session) {
				token.two_factor_authentication =
					session.user.two_factor_authentication;
				return token;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			return {
				...session,
				user: {
					...session.user,
					access_token: token.access_token,
					expires_at: token.expires_at,
					refresh_token: token.refresh_token,
				},
				expires: 60,
			};
		},
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			return url;
		},
	},
	secret: process.env.AUTH_SECRET,
	cookies: {
		sessionToken: {
			name: 'test',
			options: {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60,
			},
		},
	},
	...authConfig,
});
