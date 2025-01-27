import { DrizzleUsersRepository } from '@/@core/infra/repositories/drizzle.users.repository';
import { AutheticateWithProvidersUseCase } from '@core/application/use-cases/user/authenticate-with-providers.use-case';
import NextAuth, { type Session } from 'next-auth';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		signIn: async ({ user, account, profile, credentials }) => {
			console.log(credentials);
			if (credentials) return true;

			const usersRepository = new DrizzleUsersRepository();
			const autheticateWithProvidersUseCase =
				new AutheticateWithProvidersUseCase(usersRepository);

			return await autheticateWithProvidersUseCase.execute({
				name: user.name,
				email: user.email as string,
				provider: account?.provider,
				image: profile?.picture,
			});
		},
		jwt: async ({ token, user, trigger, session }) => {
			return token;
		},
		session: async ({ session, token }) => {
			return session;
		},
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			return url;
		},
	},
	...authConfig,
});
