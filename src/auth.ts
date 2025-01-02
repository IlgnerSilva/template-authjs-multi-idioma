import { findByUserEmail, insertUser, updateUser } from '@/services/user';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		signIn: async ({ user, account, profile, credentials, email }) => {
			//console.log({ user, account, profile, credentials, email });
			if (credentials) return true;

			const userFound = await findByUserEmail(user.email as string);
			if (!userFound[0]) {
				const userCreated = await insertUser({
					user_id: user.id,
					email: user.email as string,
					name: user.name as string,
					emailVerified: profile?.email_verified,
					provider: account?.provider,
					providerUserId: account?.providerAccountId,
					image: profile?.picture,
				});
				console.log('AQUI', userCreated);
				return true;
			}

			if (userFound[0].provider !== account?.provider) {
				console.log('Provider diferente');
				return false;
			}

			await updateUser(userFound[0]);
			return true;
		},
		session: async ({ session, user }) => {
			console.log({ session, user });
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
