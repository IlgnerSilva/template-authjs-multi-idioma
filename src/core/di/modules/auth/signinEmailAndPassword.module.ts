import { SIGNINEMAILANDPASSWORD_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { ContainerModule, type interfaces } from 'inversify';

import { SigninEmailAndPasswordUseCase } from '@/core/application/usecases/auth/SigninEmailAndPassword.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<SigninEmailAndPasswordUseCase>(
		SIGNINEMAILANDPASSWORD_SYMBOLS.SigninEmailAndPasswordUseCase,
	).to(SigninEmailAndPasswordUseCase);
};

export const SigninEmailAndPasswordModule = new ContainerModule(
	initializeModule,
);
