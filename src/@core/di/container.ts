import { Container } from 'inversify';
import { AuthenticationModule } from '@core/di/modules/authentication.module';

import { type DI_RETURN_TYPES, DI_SYMBOLS } from '@core/di/types';

const ApplicationContainer = new Container({
	defaultScope: 'Singleton',
});

export const initializeContainer = () => {
	ApplicationContainer.load(AuthenticationModule);
};

export const destroyContainer = () => {
	ApplicationContainer.load(AuthenticationModule);
};

if (process.env.NODE_ENV !== 'test') {
	initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
	symbol: K,
): DI_RETURN_TYPES[K] {
	return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
