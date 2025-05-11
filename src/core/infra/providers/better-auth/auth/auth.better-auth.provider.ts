import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { auth as batterAuth } from '@/lib/better-auth/auth';
import { injectable } from 'inversify';

@injectable()
export class AuthBetterAuthProvider implements IAuthBetterAuthProvider {
	async signinEmailAndPassword(email: string, password: string) {
		return await batterAuth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
	}

	async verifyTOTP(code: string) {
		return await batterAuth.api.verifyTOTP({
			body: {
				code,
			},
		});
	}
}
