import { signin } from './auth/signin';
import { signout } from './auth/signout';
import { verifyTotp } from './auth/verify-totp';
import { getSession } from './auth/getSessionAuth';

export const router = {
	auth: {
		signin,
		verifyTotp,
		signout,
		getSession
	},
};
