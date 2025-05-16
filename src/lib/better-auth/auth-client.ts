import { createAuthClient } from 'better-auth/client';
import { twoFactorClient } from 'better-auth/plugins';
import { env } from '@/env/server'


export const authClient = createAuthClient({
	baseURL: env.HOST,
	plugins: [twoFactorClient()],
	fetchOptions: {
		credentials: 'include',
	},
});
