import 'reflect-metadata';

import { AuthenticationModule } from '@/core/di/modules/authentication.module';
import { Container } from 'inversify';

const ApplicationContainer = new Container({
	defaultScope: 'Singleton',
});

export const initializeContainer = () => {
	ApplicationContainer.load(AuthenticationModule);
};

export const destroyContainer = () => {
	ApplicationContainer.unbindAll();
};

if (process.env.NODE_ENV !== 'test') {
	initializeContainer();
}

export const getInjection = <T>(symbol: symbol & { __type: T }): T => {
	return ApplicationContainer.get(symbol);
};

export { ApplicationContainer };
