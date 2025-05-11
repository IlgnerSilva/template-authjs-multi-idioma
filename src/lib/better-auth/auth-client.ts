import { createAuthClient } from 'better-auth/client';
import { twoFactorClient } from 'better-auth/plugins';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000/',
	plugins: [twoFactorClient()],
	fetchOptions: {
		credentials: 'include',
	},
});
