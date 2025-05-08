import { ContainerModule, type interfaces } from 'inversify';
import { VERIFYTOTP_SIMBOLS } from '@/core/di/symbols/authentication.symbols';

import type { IAuthBetterAuthProvider } from '@/core/domain/providers/better-auth/auth.better-auth.interface';
import { AuthBetterAuthProvider } from '@/core/infra/providers/better-auth/auth/auth.better-auth.provider';

import { VerifyTOTP } from '@/core/application/usecases/auth/VerifyTOTP.use-case';

const initializeModule = (bind: interfaces.Bind) => {
	bind<VerifyTOTP>(
		VERIFYTOTP_SIMBOLS.VerifyTOTP,
	).to(VerifyTOTP);
};

export const VerifyTOTPModule = new ContainerModule(initializeModule);
