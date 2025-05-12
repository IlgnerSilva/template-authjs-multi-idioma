import { SIGNOUT_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class SignoutUseCase {
	constructor(
		@inject(SIGNOUT_SYMBOLS.IAuthBetterAuthProvider)
		private betterAuth: IAuthBetterAuthProvider,
	) {}
	async execute() {
		return await this.betterAuth.signout();
	}
}
