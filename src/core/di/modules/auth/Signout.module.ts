import { SIGNOUT_SYMBOLS } from '@/core/di/symbols/authentication.symbols';
import { ContainerModule, type interfaces } from 'inversify';

import { SignoutUseCase } from '@/core/application/usecases/auth/Signout.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<SignoutUseCase>(SIGNOUT_SYMBOLS.SignoutUseCase).to(SignoutUseCase);
};

export const SignoutModule = new ContainerModule(initializeModule);
