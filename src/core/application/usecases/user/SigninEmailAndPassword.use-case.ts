import { AUTHENTICATION_SYMBOLS } from "@/core/di/symbols/authentication.symbols"
import type { IAuthBetterAuthProvider } from "@/core/domain/providers/better-auth/auth.better-auth.interface"
import { inject, injectable } from 'inversify';

interface SigninEmailAndPasswordUseCaseRequest {
	email: string;
	password: string;
}

@injectable()
export class SigninEmailAndPasswordUseCase {
	constructor(@inject(AUTHENTICATION_SYMBOLS.IAuthBetterAuthProvider) private betterAuth: IAuthBetterAuthProvider){}
	async execute({
		email,
		password,
	}: SigninEmailAndPasswordUseCaseRequest) {
		return await this.betterAuth.signinEmailAndPassword(email, password)
	}
}
