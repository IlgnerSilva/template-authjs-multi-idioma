import { ContainerModule, type interfaces } from 'inversify';
import { BETTERAUTHPROVIDER_SYMBOLS } from '@/core/di/symbols/better-auth.symbols';

import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { AuthBetterAuthProvider } from '@/core/infra/providers/better-auth/auth/auth.better-auth.provider';

const initializeModule = (bind: interfaces.Bind) => {
	bind<IAuthBetterAuthProvider>(BETTERAUTHPROVIDER_SYMBOLS.IAuthBetterAuthProvider).to(
		AuthBetterAuthProvider,
	);
};

export const BetterAuthProviderModule = new ContainerModule(initializeModule);
