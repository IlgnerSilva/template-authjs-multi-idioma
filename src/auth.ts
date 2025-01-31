import { AutheticateWithProvidersUseCase } from '@core/application/use-cases/user/authenticate-with-providers.use-case';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		signIn: async ({ user, account, profile, credentials }) => {
			if (credentials) return true;

			return await AutheticateWithProvidersUseCase.execute({
				name: user.name,
				email: user.email as string,
				provider: account?.provider,
				image: profile?.picture,
			});
		},
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, user, token }) {
			return { ...session, ...token };
		},
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			return url;
		},
	},
});
