import { AutheticateWithProvidersUseCase } from '@core/application/use-cases/user/authenticate-with-providers.use-case';
import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';

declare module 'next-auth' {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			name: string;
			email: string;
			picture: string;
			sub: string;
			user_id: string;
			provider: string;
			organizations: [
				{ user_id: string; org_id: string; role: string; active: boolean },
			];
			callbackUrl: string;
			iat: number;
			exp: number;
			jti: string;
		} & DefaultSession['user'];
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	pages: {
		signIn: '/auth/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60,
	},
	callbacks: {
		signIn: async ({ user, account, profile, credentials }) => {
			if (credentials) return true;
			return await AutheticateWithProvidersUseCase.execute();
		},
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, user, token }) {
			return {
				...session,
				user: {
					...session.user,
					...token,
				},
			};
		},
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			return url;
		},
	},
});
