import 'reflect-metadata';

import { Container } from 'inversify';
import { AuthenticationModule } from '@core/di/modules/authentication.module';

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
