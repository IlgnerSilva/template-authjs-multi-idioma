import type { SigninEmailAndPasswordUseCase } from '@/core/application/usecases/user/SigninEmailAndPassword.use-case';
import { createSymbol } from '@/core/di/utils/createSymbols.util';
import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import type { IEmailService } from '@/core/domain/services/email.service.interface';


export const AUTHENTICATION_SYMBOLS = {
	IAuthBetterAuthProvider: createSymbol<IAuthBetterAuthProvider>('IAuthBetterAuthProvider'),
	IEmailService: createSymbol<IEmailService>('IEmailService'),
	// IPassword: createSymbol<IPassword>('IPassword'),
	SigninEmailAndPasswordUseCase:
		createSymbol<SigninEmailAndPasswordUseCase>(
			'SigninEmailAndPasswordUseCase',
		),
} as const;
