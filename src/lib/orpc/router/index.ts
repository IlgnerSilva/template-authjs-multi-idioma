import { signin } from './auth/signin';
import { signout } from './auth/signout';
import { verifyTotp } from './auth/verify-totp';

export const router = {
	auth: {
		signin,
		verifyTotp,
		signout,
	},
};
