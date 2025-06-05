import { GETSESSIONAUTH_SIMBOLS } from '@/core/di/symbols/authentication.symbols';
import { ContainerModule, type interfaces } from 'inversify';
import { GetSessionAuthUseCase } from '@/core/application/usecases/auth/GetSessionAuth.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<GetSessionAuthUseCase>(
		GETSESSIONAUTH_SIMBOLS.GetSessionAuthUseCase,
	).to(GetSessionAuthUseCase);
};

export const GetSessionAuthModule = new ContainerModule(
	initializeModule,
);
