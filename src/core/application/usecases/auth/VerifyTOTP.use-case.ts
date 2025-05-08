import { SIGNINEMAILANDPASSWORD_SYMBOLS } from "@/core/di/symbols/authentication.symbols"
import type { IAuthBetterAuthProvider } from "@/core/domain/providers/better-auth/auth.better-auth.interface"
import { inject, injectable } from 'inversify';

interface VerifyTOTPUseCaseRequest {
	code: string;
}

@injectable()
export class VerifyTOTP {
	constructor(@inject(SIGNINEMAILANDPASSWORD_SYMBOLS.IAuthBetterAuthProvider) private betterAuth: IAuthBetterAuthProvider){}
	async execute({
		code
	}: VerifyTOTPUseCaseRequest) {
		return await this.betterAuth.verifyTOTP(code)
	}
}
