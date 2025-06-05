import 'reflect-metadata';

import { SignoutModule } from '@/core/di/modules/auth/Signout.module';
import { SigninEmailAndPasswordModule } from '@/core/di/modules/auth/signinEmailAndPassword.module';
import { VerifyTOTPModule } from '@/core/di/modules/auth/verifyTotp.module';
import { GetSessionAuthModule } from '@/core/di/modules/auth/getSessionAuth.module';
import { BetterAuthProviderModule } from '@/core/di/modules/providers/better-auth/better-auth.module';
import { Container } from 'inversify';

const ApplicationContainer = new Container({
	defaultScope: 'Singleton',
});

export const initializeContainer = () => {
	ApplicationContainer.load(BetterAuthProviderModule);
	ApplicationContainer.load(SigninEmailAndPasswordModule);
	ApplicationContainer.load(VerifyTOTPModule);
	ApplicationContainer.load(SignoutModule);
	ApplicationContainer.load(GetSessionAuthModule);
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
