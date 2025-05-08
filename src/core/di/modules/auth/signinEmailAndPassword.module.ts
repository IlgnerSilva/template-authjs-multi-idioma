import { ContainerModule, type interfaces } from 'inversify';
import { AUTHENTICATION_SYMBOLS } from '@/core/di/symbols/authentication.symbols';

import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { AuthBetterAuthProvider } from '@/core/infra/providers/better-auth/auth/auth.better-auth.provider';

import { SigninEmailAndPasswordUseCase } from '@/core/application/usecases/user/SigninEmailAndPassword.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<IAuthBetterAuthProvider>(AUTHENTICATION_SYMBOLS.IAuthBetterAuthProvider).to(
		AuthBetterAuthProvider,
	);
	bind<SigninEmailAndPasswordUseCase>(
		AUTHENTICATION_SYMBOLS.SigninEmailAndPasswordUseCase,
	).to(SigninEmailAndPasswordUseCase);
};

export const SigninEmailAndPasswordModule = new ContainerModule(initializeModule);
