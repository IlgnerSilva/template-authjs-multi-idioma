import { signin } from './auth/signin';
import { verifyTotp } from './auth/verify-totp';

export const router = {
	auth: {
		signin,
		verifyTotp
	},
};
