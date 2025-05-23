import { createAuthClient } from 'better-auth/client';
import { twoFactorClient } from 'better-auth/plugins';

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_HOST,
	plugins: [twoFactorClient()],
	fetchOptions: {
		credentials: 'include',
	},
});
