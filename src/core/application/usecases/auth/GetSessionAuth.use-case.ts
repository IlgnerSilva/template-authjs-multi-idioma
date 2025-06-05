import { GETSESSIONAUTH_SIMBOLS } from "@/core/di/symbols/authentication.symbols"
import type { IAuthBetterAuthProvider } from "@/core/domain/providers/better-auth/auth.better-auth.interface"
import { inject, injectable } from 'inversify';

@injectable()
export class GetSessionAuthUseCase {
	constructor(@inject(GETSESSIONAUTH_SIMBOLS.IAuthBetterAuthProvider) private betterAuth: IAuthBetterAuthProvider){}
	async execute() {
		return await this.betterAuth.getSessionAuth()
	}
}
