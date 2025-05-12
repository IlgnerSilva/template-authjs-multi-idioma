import type { SigninEmailAndPasswordUseCase } from '@/core/application/usecases/auth/SigninEmailAndPassword.use-case';
import type { SignoutUseCase } from '@/core/application/usecases/auth/Signout.use-case';
import type { VerifyTOTP } from '@/core/application/usecases/auth/VerifyTOTP.use-case';
import { createSymbol } from '@/core/di/utils/createSymbols.util';
import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';

export const SIGNINEMAILANDPASSWORD_SYMBOLS = {
	IAuthBetterAuthProvider: createSymbol<IAuthBetterAuthProvider>(
		'IAuthBetterAuthProvider',
	),
	SigninEmailAndPasswordUseCase: createSymbol<SigninEmailAndPasswordUseCase>(
		'SigninEmailAndPasswordUseCase',
	),
} as const;

export const SIGNOUT_SYMBOLS = {
	IAuthBetterAuthProvider: createSymbol<IAuthBetterAuthProvider>(
		'IAuthBetterAuthProvider',
	),
	SignoutUseCase: createSymbol<SignoutUseCase>('SignoutUseCase'),
} as const;

export const VERIFYTOTP_SIMBOLS = {
	IAuthBetterAuthProvider: createSymbol<IAuthBetterAuthProvider>(
		'IAuthBetterAuthProvider',
	),
	VerifyTOTP: createSymbol<VerifyTOTP>('VerifyTOTP'),
} as const;
