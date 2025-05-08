import 'reflect-metadata';

import { BetterAuthProviderModule } from '@/core/di/modules/providers/better-auth/better-auth.module';
import { SigninEmailAndPasswordModule } from '@/core/di/modules/auth/signinEmailAndPassword.module';
import { VerifyTOTPModule } from '@/core/di/modules/auth/verifyTotp.module';
import { Container } from 'inversify';

const ApplicationContainer = new Container({
	defaultScope: 'Singleton',
});

export const initializeContainer = () => {
	ApplicationContainer.load(BetterAuthProviderModule);
	ApplicationContainer.load(SigninEmailAndPasswordModule);
	ApplicationContainer.load(VerifyTOTPModule);
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
