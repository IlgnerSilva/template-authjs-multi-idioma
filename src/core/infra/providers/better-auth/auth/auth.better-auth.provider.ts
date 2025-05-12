import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { auth as betterAuth } from '@/lib/better-auth/auth';
import { injectable } from 'inversify';
import { headers } from 'next/headers';

@injectable()
export class AuthBetterAuthProvider implements IAuthBetterAuthProvider {
	async signinEmailAndPassword(email: string, password: string) {
		return await betterAuth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
	}

	async signout(): Promise<{ success: boolean }> {
		return await betterAuth.api.signOut({
			headers: await headers(),
		});
	}

	async verifyTOTP(code: string) {
		return await betterAuth.api.verifyTOTP({
			body: {
				code,
			},
		});
	}
}
